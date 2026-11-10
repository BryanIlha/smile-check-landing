import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
const dist = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', dist), 'utf8');
const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
assert(canonical && /^https:\/\/(visto|agendo)\.hawksbi\.com\.br\/$/.test(canonical), 'Canonical oficial ausente');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Conteúdo principal deve existir no HTML inicial');
assert(html.includes('id="hero-title"'), 'Título visível deve ser pré-renderizado');
assert(!/href="https?:\/\/(?:localhost|127\.0\.0\.1)/.test(html), 'Link local no build público');
assert(html.includes('name="robots" content="index, follow"'), 'Homepage deve permitir indexação');
const data = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
assert(data, 'Dados estruturados ausentes');
const schema = JSON.parse(data);
assert.equal(schema['@context'], 'https://schema.org');
const graph = schema['@graph'];
const page = graph.find(node => node['@type'] === 'WebPage');
const site = graph.find(node => node['@type'] === 'WebSite');
const app = graph.find(node => node['@type'] === 'WebApplication');
const organization = graph.find(node => node['@type'] === 'Organization');
assert.equal(page.url, canonical);
assert.equal(site.url, canonical);
assert.equal(site.name, 'Visto');
assert.equal(page.isPartOf['@id'], site['@id']);
assert.equal(page.mainEntity['@id'], app['@id']);
assert.equal(page.about['@id'], app['@id']);
assert.equal(app.mainEntityOfPage['@id'], page['@id']);
assert.equal(app['@id'], `${canonical}#software`);
assert.equal(app.publisher['@id'], organization['@id']);
assert.equal(app.description, page.description);
assert.equal(app.image, `${canonical}assets/visto/visto-social.png`);
for (const property of ['offers', 'aggregateRating', 'review']) assert.ok(!(property in app));
for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)) {
  if (!match[1].startsWith('//')) await access(new URL(match[1].slice(1), dist));
}
const robots = await readFile(new URL('robots.txt', dist), 'utf8');
assert(robots.includes(`Sitemap: ${canonical}sitemap.xml`));
assert(!/Disallow:\s*\/\s*(?:\n|$)/.test(robots));
const sitemap = await readFile(new URL('sitemap.xml', dist), 'utf8');
assert(sitemap.includes(`<loc>${canonical}</loc>`));
assert.equal((sitemap.match(/<loc>/g)||[]).length,4);
const notFound = await readFile(new URL('404.html', dist), 'utf8');
assert(notFound.includes('name="robots" content="noindex, follow"'));
assert(!notFound.includes('rel="canonical"'), '404 não deve canonicalizar para a homepage');
console.log('SEO: HTML inicial, URLs, schema, assets, robots, sitemap e documento 404 válidos.');

for(const match of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
 const path=new URL(match[1]).pathname;
 const page=await readFile(new URL(`${path.slice(1)}index.html`,dist),'utf8');
 assert(page.includes(`rel="canonical" href="${match[1]}"`));
 assert.equal((page.match(/<h1\b/g)||[]).length,1);
 if (path !== '/') {
   const graph = JSON.parse(page.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
   const web = graph.find(node => node['@type'] === 'WebPage');
   const breadcrumbs = graph.find(node => node['@type'] === 'BreadcrumbList');
   assert.equal(web.url, match[1]);
   assert.equal(web.breadcrumb['@id'], breadcrumbs['@id']);
   assert.equal(breadcrumbs.itemListElement.at(-1).item, match[1]);
 }
 for(const asset of page.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)) await access(new URL(asset[1].slice(1),dist));
}
