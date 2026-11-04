import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { render, solutions } from '../.ssr/entry-server.js';
const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html',dist), 'utf8');
const origin='https://visto.hawksbi.com.br';
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
for(const page of [null,...solutions]) {
 const path=page?`/${page.slug}/`:'/';
 let html=template;
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
 if(page) {
  html=html.replace(/<title>.*?<\/title>/,`<title>${escape(page.title)}</title>`);
  for(const [key,value] of Object.entries({description:page.description,'og:title':page.title,'og:description':page.description,'og:url':origin+path,'twitter:title':page.title,'twitter:description':page.description})) html=html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*(")`),(_,a,b)=>a+escape(value)+b);
  html=html.replace(/rel="canonical" href="[^"]+"/,`rel="canonical" href="${origin+path}"`);
  const web=graph['@graph'].find(x=>x['@type']==='WebPage'); Object.assign(web,{'@id':origin+path+'#webpage',url:origin+path,name:page.title,description:page.description,breadcrumb:{'@id':origin+path+'#breadcrumbs'}});
  graph['@graph'].push({'@type':'BreadcrumbList','@id':origin+path+'#breadcrumbs',itemListElement:[{'@type':'ListItem',position:1,name:'Visto',item:origin+'/'},{'@type':'ListItem',position:2,name:page.heading,item:origin+path}]});
 }
 html=html.replace(/<script type="application\/ld\+json">.*?<\/script>/s,`<script type="application/ld+json">${JSON.stringify(graph).replaceAll('<','\\u003c')}</script>`);
 const markup=render(path).replaceAll(/<a\b[^>]*href="mailto:[^>]*>[\s\S]*?<\/a>/g,link=>`<!--email_off-->${link}<!--/email_off-->`);
 if(!html.includes('<div id="root"></div>')) throw new Error('Prerender target missing');
 const target=new URL(`${path.slice(1)}index.html`,dist); await mkdir(new URL('.',target),{recursive:true});
 await writeFile(target,html.replace('<div id="root"></div>',`<div id="root">${markup}</div>`));
}
await writeFile(new URL('sitemap.xml',dist),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/',...solutions.map(p=>`/${p.slug}/`)].map(p=>`<url><loc>${origin+p}</loc></url>`).join('')}</urlset>\n`);
console.log('Visto: home e três guias pré-renderizados, canonical e sitemap por rota.');
