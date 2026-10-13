import { useEffect, useState } from 'react';
import { parseBlogFeed, type BlogArticle } from './blog-feed.mjs';

const product = 'visto';
const productName = 'Visto';
const blogUrl = `https://hawksbi.com.br/blog/?produto=${product}`;
const feedUrl = `https://hawksbi.com.br/blog/feeds/${product}.json`;
const dateFormat = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function ProductNews() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 15000);
    fetch(feedUrl, { signal: controller.signal, credentials: 'omit' })
      .then(response => { if (!response.ok) throw new Error('Feed indisponível'); return response.json(); })
      .then(value => { const items = parseBlogFeed(value, product); if (active) { setArticles(items); setState('ready'); } })
      .catch(() => { if (active) setState('error'); })
      .finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [attempt]);
  return <section className="product-news" id="novidades" aria-labelledby="news-title">
    <div className="product-news__inner">
      <header className="product-news__heading"><h2 id="news-title">O {productName}<br />em evolução.</h2><p>Novidades, melhorias e correções.<br />Acompanhe o que muda na sua rotina.</p></header>
      {state === 'loading' && <p className="product-news__message" role="status">Carregando novidades…</p>}
      {state === 'error' && <div className="product-news__message" role="status"><p>As novidades não carregaram. Você pode consultar o blog ou tentar novamente.</p><button type="button" onClick={() => { setState('loading'); setAttempt(value => value + 1); }}>Tentar novamente</button></div>}
      {state === 'ready' && articles.length === 0 && <p className="product-news__message" role="status">As próximas novidades do {productName} vão aparecer aqui.</p>}
      {state === 'ready' && <div className="product-news__list">{articles.map(article => <article key={article.id}>
        <div className="product-news__meta"><time dateTime={article.date}>{dateFormat.format(new Date(`${article.date}T12:00:00Z`))}</time><span>{article.kind === 'patch-notes' ? 'Notas da semana' : 'Novidade'}</span></div>
        <div className="product-news__story"><h3><a href={article.url}>{article.title}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></a></h3><p>{article.summary}</p><p className="product-news__availability"><strong>{article.status}</strong> · {article.availabilityNote}</p></div>
      </article>)}</div>}
      <a className="product-news__all" href={blogUrl}>Todos os posts do {productName} no blog Hawks<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></a>
    </div>
  </section>;
}
