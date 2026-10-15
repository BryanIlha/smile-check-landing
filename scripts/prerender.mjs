import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../.ssr/entry-server.js';
const path = new URL('../dist/index.html', import.meta.url);
const html = await readFile(path, 'utf8');
// Match Cloudflare's email-protection exception so hydration retains the server tree.
const markup = render().replaceAll(/<a\b[^>]*href="mailto:[^>]*>[\s\S]*?<\/a>/g,
  link => `<!--email_off-->${link}<!--/email_off-->`);
if (!html.includes('<div id="root"></div>')) throw new Error('Prerender target missing');
await writeFile(path, html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`));
console.log('Visto renderizado no HTML inicial.');
