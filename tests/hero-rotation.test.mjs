import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { after, before, test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "playwright";
import { preview } from "vite";

const labels = ["operação", "restaurante", "padaria", "bar"];
const evidence = process.env.VISTO_HERO_EVIDENCE;
let browser;
let server;
let base = process.env.VISTO_HERO_URL;

before(async () => {
  if (evidence) await mkdir(evidence, { recursive: true });
  browser = await chromium.launch({ channel: process.env.VISTO_TEST_BROWSER_CHANNEL, args: ["--disable-gpu"] });
  if (!base) {
    server = await preview({ preview: { host: "127.0.0.1", port: 0 } });
    base = `http://127.0.0.1:${server.httpServer.address().port}/`;
  }
});

after(async () => {
  await browser?.close();
  await server?.close();
});

async function openHero(width, height, reducedMotion) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion });
  page.setDefaultTimeout(10000);
  await page.route("https://hawksbi.com.br/blog/feeds/visto.json", (route) =>
    route.fulfill({ json: { schemaVersion: 1, articles: [] } }));
  await page.goto(base, { waitUntil: "domcontentloaded" });
  return page;
}

for (const [width, height] of [[320, 568], [375, 667], [768, 900], [1024, 768], [1440, 900]]) {
  test(`restored hero fits at ${width}px`, async () => {
    const page = await openHero(width, height, "reduce");
    try {
      const title = page.getByRole("heading", { level: 1 });
      assert.equal((await title.innerText()).replace(/\s+/g, " ").trim(), "Rotinas sob controle em qualquer operação");
      assert.deepEqual(await title.locator(".hero-rotating-word__value").allTextContents(), labels);
      const heading = await title.boundingBox();
      const word = await title.locator(".is-active").boundingBox();
      assert.ok(heading.x >= 0 && heading.x + heading.width <= width);
      assert.ok(word.x >= 0 && word.x + word.width <= width);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
      if (evidence) await page.screenshot({ path: `${evidence}/hero-${width}.png` });
      await page.locator("#inicio").getByRole("button", { name: "Pedir demonstração" }).click();
      await page.getByRole("dialog", { name: "Veja o Visto na prática" }).waitFor({ state: "visible" });
      await page.keyboard.press("Escape");
    } finally {
      await page.close();
    }
  });
}

test("hero cycles through the original words and pauses for reduced motion", async () => {
  const page = await openHero(1440, 900, "no-preference");
  try {
    const active = page.locator(".hero-rotating-word__value.is-active");
    for (const label of [...labels.slice(1), labels[0]]) {
      await page.waitForFunction((expected) =>
        document.querySelector(".hero-rotating-word__value.is-active")?.textContent === expected,
      label, { timeout: 5000 });
      assert.equal(await active.getAttribute("aria-hidden"), "false");
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    const paused = await active.innerText();
    await delay(2900);
    assert.equal(await active.innerText(), paused);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.waitForFunction((previous) =>
      document.querySelector(".hero-rotating-word__value.is-active")?.textContent !== previous,
    paused, { timeout: 5000 });
  } finally {
    await page.close();
  }
});
