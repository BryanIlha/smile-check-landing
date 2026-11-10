import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { after, before, test } from "node:test";
import { chromium } from "playwright";
import { preview } from "vite";

const endpoint = "https://hawksbi.com.br/api/visto-demo";
const demoLabel = "Pedir demonstração";
const timeZone = "America/Sao_Paulo";
const slots = [
  { id: "primeiro-horario", startsAt: "2030-11-20T14:00:00-03:00", endsAt: "2030-11-20T15:00:00-03:00" },
  { id: "segundo-horario", startsAt: "2030-11-20T16:00:00-03:00", endsAt: "2030-11-20T17:00:00-03:00" },
  { id: "outro-dia", startsAt: "2030-11-21T10:00:00-03:00", endsAt: "2030-11-21T11:00:00-03:00" },
];
const fullDaySlots = [9, 10, 11, 14, 15, 16].map((hour) => ({
  id: `horario-${hour}`,
  startsAt: `2030-11-20T${String(hour).padStart(2, "0")}:00:00-03:00`,
  endsAt: `2030-11-20T${String(hour + 1).padStart(2, "0")}:00:00-03:00`,
}));
const evidence = process.env.VISTO_DEMO_EVIDENCE;
let browser;
let server;
let base;

before(async () => {
  if (evidence) await mkdir(evidence, { recursive: true });
  browser = await chromium.launch({ channel: process.env.VISTO_TEST_BROWSER_CHANNEL, args: ["--disable-gpu"] });
  server = await preview({ preview: { host: "127.0.0.1", port: 0 } });
  base = `http://127.0.0.1:${server.httpServer.address().port}/`;
});

after(async () => {
  await browser?.close();
  await server?.close();
});

async function openLanding(width, height, { availability = () => slots, submit, reducedMotion = "reduce" } = {}) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion });
  page.setDefaultTimeout(10000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("https://hawksbi.com.br/blog/feeds/visto.json", (route) =>
    route.fulfill({ json: { schemaVersion: 1, articles: [] } }));
  await page.route(endpoint, async (route) => {
    if (route.request().method() === "POST") {
      assert.ok(submit, "Unexpected submission");
      await submit(route);
    } else {
      const available = availability();
      await route.fulfill(available
        ? { json: { siteKey: "synthetic-test-widget", timeZone, slots: available } }
        : { status: 503, json: { ok: false } });
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
  await page.goto(base, { waitUntil: "domcontentloaded" });
  return { page, errors, dialog: page.locator("#visto-demo"), hero: page.locator("#inicio").getByRole("button", { name: demoLabel }) };
}

async function enterContact(dialog, phone = "+55 (11) 99999-9999") {
  await dialog.getByLabel("Nome", { exact: true }).fill("Bruna");
  await dialog.getByLabel("Sobrenome").fill("Teste");
  await dialog.getByLabel("E-mail").fill("bruna@example.test");
  await dialog.getByLabel("Telefone com DDD").fill(phone);
  await dialog.getByRole("button", { name: "Continuar" }).click();
}

async function enterBusiness(dialog) {
  await dialog.getByLabel("Quantos funcionários o negócio tem?").fill("12");
  await dialog.getByLabel("Qual é a maior dificuldade hoje?").fill("Conferir as rotinas dos turnos.");
  await dialog.getByLabel("Nome do negócio").fill("Padaria de Teste");
  await dialog.getByRole("button", { name: "Continuar" }).click();
}

async function choose(dialog, name) {
  await dialog.locator("[data-challenge-ready]").waitFor({ state: "attached" });
  await dialog.getByText(name, { exact: true }).click();
  assert.equal(await dialog.getByRole("radio", { name }).isChecked(), true);
}

async function assertFits(page, dialog, width, height) {
  const bounds = await dialog.boundingBox();
  assert.ok(bounds.x >= 11 && bounds.x + bounds.width <= width - 11);
  assert.ok(bounds.y >= 11 && bounds.y + bounds.height <= height - 11);
  assert.equal(await dialog.evaluate((element) => element.scrollWidth === element.clientWidth), true);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
}

for (const [width, height] of [[320, 568], [375, 667], [768, 900], [1024, 768], [1440, 900]]) {
  test(`all entry points and three steps fit at ${width}px`, async () => {
    const { page, dialog, hero, errors } = await openLanding(width, height, { availability: () => fullDaySlots });
    try {
      assert.equal(await page.locator('button[aria-controls="visto-demo"]').count(), 5);
      await hero.click();
      assert.equal(await dialog.getByRole("heading").innerText(), "Veja o Visto na prática");
      assert.equal(await dialog.evaluate(() => document.activeElement?.id), "visto-demo-title");
      const progress = dialog.getByRole("list", { name: "Etapas da demonstração" });
      assert.match(await progress.locator('[aria-current="step"]').innerText(), /Contato/);
      await assertFits(page, dialog, width, height);
      if (evidence) await page.screenshot({ path: `${evidence}/contato-${width}.png` });
      await page.keyboard.press("Tab");
      assert.equal(await dialog.getByLabel("Nome", { exact: true }).evaluate((element) => element === document.activeElement), true);
      for (let index = 0; index < 6; index++) {
        await page.keyboard.press("Tab");
        assert.equal(await page.evaluate(() => !document.activeElement?.closest("header, footer, section")), true);
      }
      await enterContact(dialog);
      await dialog.getByRole("heading", { name: "Conte sobre o seu negócio" }).waitFor();
      assert.match(await progress.locator('[aria-current="step"]').innerText(), /Negócio/);
      await assertFits(page, dialog, width, height);
      if (evidence) await page.screenshot({ path: `${evidence}/negocio-${width}.png` });
      await enterBusiness(dialog);
      await dialog.getByRole("radio", { name: "14:00" }).waitFor();
      assert.equal(await dialog.getByRole("radio").count(), 6);
      assert.match(await progress.locator('[aria-current="step"]').innerText(), /Horário/);
      assert.equal(await progress.locator('[data-complete="true"]').count(), 2);
      await assertFits(page, dialog, width, height);
      if (evidence) await page.screenshot({ path: `${evidence}/agenda-${width}.png` });
      await page.keyboard.press("Escape");
      await dialog.waitFor({ state: "hidden" });
      assert.equal(await hero.evaluate((element) => element === document.activeElement), true);

      const menu = page.getByRole("button", { name: "Menu" });
      const menuVisible = await menu.isVisible();
      if (menuVisible) await menu.click();
      await page.locator(menuVisible ? ".marketing-mobile-menu" : ".marketing-nav-actions")
        .getByRole("button", { name: demoLabel }).click();
      await dialog.getByRole("button", { name: "Fechar demonstração" }).click();
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

test("step motion follows the visitor's motion preference", async () => {
  const { page, dialog, hero } = await openLanding(375, 667, { reducedMotion: "no-preference" });
  try {
    await hero.click();
    const arrow = dialog.getByRole("button", { name: "Continuar" }).locator("svg");
    assert.equal(await arrow.evaluate((element) => getComputedStyle(element).stroke), "rgb(255, 121, 0)");
    await enterContact(dialog);
    const current = dialog.locator('[aria-current="step"]');
    const content = dialog.locator(".marketing-demo__content");
    assert.equal(await current.evaluate((element) => getComputedStyle(element, "::after").transitionDuration), "0.24s");
    assert.equal(await content.evaluate((element) => getComputedStyle(element).animationName), "visto-demo-step");
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(await current.evaluate((element) => getComputedStyle(element, "::after").transitionProperty), "none");
    assert.equal(await content.evaluate((element) => getComputedStyle(element).animationName), "none");
  } finally {
    await page.close();
  }
});

test("validates details, preserves them on Back and confirms only after booking", async () => {
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
        await route.fulfill({ status: 201, json: { booking: { ...slots[0], id: "receipt", timeZone } } });
      }
    },
  });
  try {
    await hero.click();
    await dialog.getByRole("button", { name: "Continuar" }).click();
    assert.equal(await dialog.getByLabel("Nome", { exact: true }).evaluate((input) => input.validity.valueMissing), true);
    await enterContact(dialog, "123");
    const phone = dialog.getByLabel("Telefone com DDD");
    assert.equal(await phone.evaluate((input) => input.validity.customError), true);
    await phone.fill("+55 (11) 99999-9999");
    await dialog.getByRole("button", { name: "Continuar" }).click();
    await dialog.getByRole("button", { name: "Voltar" }).click();
    assert.equal(await dialog.getByLabel("Sobrenome").inputValue(), "Teste");
    await dialog.getByRole("button", { name: "Continuar" }).click();
    await enterBusiness(dialog);
    await dialog.getByRole("button", { name: "Voltar" }).click();
    assert.equal(await dialog.getByLabel("Nome do negócio").inputValue(), "Padaria de Teste");
    await dialog.getByRole("button", { name: "Continuar" }).click();
    await choose(dialog, "14:00");

    const confirm = dialog.getByRole("button", { name: "Confirmar horário" });
    await confirm.click();
    assert.equal(await dialog.getByRole("button", { name: "Confirmando…" }).isDisabled(), true);
    assert.equal(await dialog.getByRole("heading", { name: "Demonstração agendada" }).count(), 0);
    release();
    await dialog.getByRole("alert").waitFor();
    assert.match(await dialog.getByRole("alert").innerText(), /mesmo horário/);
    assert.equal(await dialog.getByRole("radio").count(), 0);
    await confirm.click();
    await dialog.getByRole("heading", { name: "Demonstração agendada" }).waitFor();
    assert.equal(requests.length, 2);
    assert.deepEqual(requests[0], requests[1]);
    assert.equal(requests[0].lead.phone, "+5511999999999");
    assert.equal(requests[0].lead.employeeCount, 12);
    assert.equal(requests[0].lead.businessName, "Padaria de Teste");
    assert.match(await dialog.locator(".marketing-demo__receipt").innerText(), /14:00 às 15:00/);
    assert.equal(await dialog.locator('[data-complete="true"]').count(), 3);
    assert.equal(await dialog.locator('[aria-current="step"]').count(), 0);
    assert.deepEqual(errors, []);
    if (evidence) await page.screenshot({ path: `${evidence}/confirmacao-375.png` });
    await dialog.getByRole("button", { name: "Voltar ao site" }).click();
    assert.equal(await hero.evaluate((element) => element === document.activeElement), true);
  } finally {
    release();
    await page.close();
  }
});

test("reloads the slots after a conflict and preserves the qualified lead", async () => {
  const requests = [];
  const { page, dialog, hero } = await openLanding(375, 667, {
    availability: () => requests.length ? slots.slice(1) : slots,
    submit: async (route) => {
      requests.push(route.request().postDataJSON());
      await route.fulfill(requests.length === 1
        ? { status: 409, json: { code: "slot_unavailable" } }
        : { status: 201, json: { booking: { ...slots[1], id: "receipt", timeZone } } });
    },
  });
  try {
    await hero.click();
    await enterContact(dialog);
    await enterBusiness(dialog);
    await choose(dialog, "14:00");
    await dialog.getByRole("button", { name: "Confirmar horário" }).click();
    assert.match(await dialog.getByRole("alert").innerText(), /acabou de ser reservado/);
    await choose(dialog, "16:00");
    assert.equal(await dialog.getByRole("radio", { name: "14:00" }).count(), 0);
    await dialog.getByRole("button", { name: "Confirmar horário" }).click();
    await dialog.getByRole("heading", { name: "Demonstração agendada" }).waitFor();
    assert.deepEqual(requests[0].lead, requests[1].lead);
    assert.notEqual(requests[0].submissionId, requests[1].submissionId);
  } finally {
    await page.close();
  }
});

test("shows a retry and an empty state when availability changes", async () => {
  let count = 0;
  const { page, dialog, hero } = await openLanding(320, 568, { availability: () => count++ === 0 ? null : [] });
  try {
    await hero.click();
    await enterContact(dialog);
    await enterBusiness(dialog);
    await dialog.getByText(/Os horários estão indisponíveis/).waitFor();
    assert.equal(await dialog.getByRole("button", { name: "Confirmar horário" }).isDisabled(), true);
    await dialog.getByRole("button", { name: "Tentar de novo" }).click();
    await dialog.getByText(/Ainda não há horários abertos/).waitFor();
    assert.equal(await dialog.getByRole("radio").count(), 0);
  } finally {
    await page.close();
  }
});
