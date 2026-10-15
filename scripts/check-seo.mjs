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
const graph = JSON.parse(data)['@graph'];
assert(graph.some(node => node['@type'] === 'WebPage' && node.url === canonical));
assert(graph.some(node => node['@type'] === 'SoftwareApplication'));
for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)) {
  if (!match[1].startsWith('//')) await access(new URL(match[1].slice(1), dist));
}
const robots = await readFile(new URL('robots.txt', dist), 'utf8');
assert(robots.includes(`Sitemap: ${canonical}sitemap.xml`));
assert(!/Disallow:\s*\/\s*(?:\n|$)/.test(robots));
const sitemap = await readFile(new URL('sitemap.xml', dist), 'utf8');
assert(sitemap.includes(`<loc>${canonical}</loc>`));
assert.equal((sitemap.match(/<loc>/g)||[]).length,1);
const notFound = await readFile(new URL('404.html', dist), 'utf8');
assert(notFound.includes('name="robots" content="noindex, follow"'));
assert(!notFound.includes('rel="canonical"'), '404 não deve canonicalizar para a homepage');
console.log('SEO: HTML inicial, URLs, schema, assets, robots, sitemap e documento 404 válidos.');
