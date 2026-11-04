import { solutions } from './solutions';
import './landing.css';
export function SolutionLinks() { return <nav className="solution-links" aria-label="Aplicações do Visto">{solutions.map(p=><a key={p.slug} href={`/${p.slug}/`}>{p.heading}</a>)}</nav>; }
export function SolutionPage({ slug }: { slug: string }) {
 const p=solutions.find(p=>p.slug===slug);
 if(!p) return <main className="marketing-page seo-page"><h1>Página não encontrada</h1><a href="/">Voltar ao Visto</a></main>;
 return <main id="conteudo" className="marketing-page seo-page"><a href="/" aria-label="Visto — página inicial"><img src="/assets/visto/visto-logo-texto.svg" width="140" height="45" alt="Visto" /></a><nav className="seo-breadcrumb" aria-label="Caminho da página"><a href="/">Início</a><span aria-hidden="true"> / </span><span aria-current="page">{p.heading}</span></nav><h1>{p.heading}</h1><p className="seo-intro">{p.intro}</p>{p.sections.map(s=><section key={s.title}><h2>{s.title}</h2><p>{s.text}</p></section>)}<section><h2>Perguntas frequentes</h2>{p.faq.map(f=><div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>)}</section><section><h2>Veja essa rotina no Visto</h2><p>Conheça o fluxo com um exemplo da sua operação.</p><a className="marketing-action" href="/#solicitar-demonstracao">Agendar demonstração</a></section><section><h2>Outras aplicações</h2><SolutionLinks/><a href="https://hawksbi.com.br/blog/?produto=visto">Guias e novidades do Visto no blog Hawks</a></section></main>;
}
