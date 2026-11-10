import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { after, before, test } from "node:test";
import { chromium } from "playwright";
import { preview } from "vite";

const endpoint = "https://hawksbi.com.br/api/visto-demo";
const demoLabel = "Pedir demonstração";
const evidence = process.env.VISTO_DEMO_EVIDENCE;
let browser;
let server;
let base;

before(async () => {
  if (evidence) await mkdir(evidence, { recursive: true });
  browser = await chromium.launch({ channel: process.env.VISTO_TEST_BROWSER_CHANNEL });
  server = await preview({ preview: { host: "127.0.0.1", port: 0 } });
  base = `http://127.0.0.1:${server.httpServer.address().port}/`;
});

after(async () => {
  await browser?.close();
  await server?.close();
});

async function openLanding(width, height, { configStatus = 200, submit } = {}) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
  page.setDefaultTimeout(7000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route(endpoint, async (route) => {
    if (route.request().method() === "POST") {
      assert.ok(submit, "Unexpected submission");
      await submit(route);
    } else {
      await route.fulfill({ status: configStatus, json: { siteKey: "synthetic-test-widget" } });
    }
  });
  await page.route("https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit", (route) =>
    route.fulfill({
      contentType: "text/javascript",
      body: `window.turnstile = {
        render: (element, options) => {
          element.dataset.challengeReady = options.action;
          options.callback("synthetic-test-token");
          return "test-widget";
        },
        remove: () => delete document.querySelector("[data-challenge-ready]")?.dataset.challengeReady
      };`,
    }),
  );
  await page.goto(base);
  return { page, errors, dialog: page.locator("#visto-demo"), hero: page.locator("#inicio").getByRole("button", { name: demoLabel }) };
}

for (const [width, height] of [[320, 568], [375, 667], [768, 900], [1024, 768], [1440, 900]]) {
  test(`every available CTA opens the same dialog at ${width}px`, async () => {
    const { page, dialog, hero, errors } = await openLanding(width, height);
    try {
      assert.equal(await page.locator('button[aria-controls="visto-demo"]').count(), 5);
      await hero.click();
      await dialog.locator('[data-challenge-ready="visto-demo"]').waitFor({ state: "attached" });
      assert.equal(await dialog.getByRole("heading").innerText(), "Veja o Visto na prática");
      assert.equal(await dialog.evaluate((element) => document.activeElement?.id), "visto-demo-title");
      const bounds = await dialog.boundingBox();
      assert.ok(bounds.x >= 11 && bounds.x + bounds.width <= width - 11);
      assert.ok(bounds.y >= 11 && bounds.y + bounds.height <= height - 11);
      assert.equal(await dialog.evaluate((element) => element.scrollWidth === element.clientWidth), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
      if (evidence) await page.screenshot({ path: `${evidence}/modal-${width}.png` });
      await page.keyboard.press("Tab");
      assert.equal(await dialog.getByLabel("Nome completo").evaluate((element) => element === document.activeElement), true);
      for (let index = 0; index < 5; index++) {
        await page.keyboard.press("Tab");
        assert.equal(await page.evaluate(() => !document.activeElement?.closest("header, footer, section")), true);
      }
      await page.keyboard.press("Escape");
      await dialog.waitFor({ state: "hidden" });
      assert.equal(await hero.evaluate((element) => element === document.activeElement), true);
      if (evidence && (width === 375 || width === 1440)) {
        await page.mouse.click(2, 100);
        await page.screenshot({ path: `${evidence}/inicio-${width}.png` });
      }

      const menu = page.getByRole("button", { name: "Menu" });
      const menuVisible = await menu.isVisible();
      if (menuVisible) await menu.click();
      const headerCta = page.locator(menuVisible ? ".marketing-mobile-menu" : ".marketing-nav-actions")
        .getByRole("button", { name: demoLabel });
      await headerCta.click();
      await dialog.getByRole("button", { name: "Fechar demonstração" }).click();
      await dialog.waitFor({ state: "hidden" });
      if (menuVisible) await page.waitForFunction(() => document.activeElement?.matches(".marketing-menu-button"));

      for (const selector of ["#solicitar-demonstracao", "footer"]) {
        await page.locator(selector).getByRole("button", { name: demoLabel }).click();
        await dialog.getByRole("button", { name: "Fechar demonstração" }).click();
      }
      assert.deepEqual(errors, []);
    } finally {
      await page.close();
    }
  });
}

test("validates input, preserves it on failure and shows a receipt only after acceptance", async () => {
  const requests = [];
  let release;
  const gate = new Promise((resolve) => { release = resolve; });
  const { page, dialog, hero, errors } = await openLanding(375, 667, {
    submit: async (route) => {
      requests.push(route.request().postDataJSON());
      if (requests.length === 1) {
        await gate;
        await route.fulfill({ status: 503, json: { ok: false } });
      } else {
        await route.fulfill({ status: 200, json: { ok: true } });
      }
    },
  });
  try {
    await hero.click();
    const send = dialog.getByRole("button", { name: demoLabel });
    await send.click();
    assert.equal(await dialog.getByLabel("Nome completo").evaluate((element) => element.validity.valueMissing), true);
    await dialog.getByLabel("Nome completo").fill("Bruna Teste");
    await dialog.getByLabel("E-mail").fill("bruna@example.test");
    const phone = dialog.getByLabel("WhatsApp com DDD");
    await phone.fill("123");
    await send.click();
    assert.equal(await phone.evaluate((element) => element.validity.customError), true);
    assert.equal(requests.length, 0);
    await phone.fill("+55 (11) 99999-9999");
    await dialog.locator("[data-challenge-ready]").waitFor({ state: "attached" });
    await send.click();
    assert.equal(await dialog.getByRole("button", { name: "Enviando pedido…" }).isDisabled(), true);
    await page.keyboard.press("Enter");
    release();
    await dialog.getByRole("alert").waitFor();
    assert.equal(await phone.inputValue(), "+55 (11) 99999-9999");
    assert.equal(await dialog.getByLabel("Nome completo").inputValue(), "Bruna Teste");
    if (evidence) await page.screenshot({ path: `${evidence}/erro-envio-375.png` });
    await dialog.locator("[data-challenge-ready]").waitFor({ state: "attached" });
    await send.click();
    await dialog.getByRole("heading", { name: "Pedido recebido" }).waitFor();
    assert.equal(requests.length, 2);
    assert.equal(requests[0].phone, "+5511999999999");
    assert.equal(requests[0].submissionId, requests[1].submissionId);
    assert.deepEqual(errors, []);
    if (evidence) await page.screenshot({ path: `${evidence}/pedido-recebido-375.png` });
    await dialog.getByRole("button", { name: "Voltar ao site" }).click();
    assert.equal(await hero.evaluate((element) => element === document.activeElement), true);
  } finally {
    release();
    await page.close();
  }
});

test("offers recovery when the verification service cannot load", async () => {
  const { page, dialog, hero } = await openLanding(320, 568, { configStatus: 503 });
  try {
    await hero.click();
    await dialog.getByRole("status").waitFor();
    assert.equal(await dialog.getByRole("button", { name: demoLabel }).isDisabled(), true);
    assert.equal(await dialog.getByRole("link", { name: "comercial@hawksbi.com.br" }).getAttribute("href"), "mailto:comercial@hawksbi.com.br");
    await dialog.getByRole("button", { name: "Tentar de novo" }).click();
    await dialog.getByRole("status").waitFor();
  } finally {
    await page.close();
  }
});
