import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./landing.css";

gsap.registerPlugin(ScrollTrigger);

function VistoWordmark({
  reversed = false,
  alt = "Visto",
  className,
}: {
  reversed?: boolean;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      src={reversed ? "/assets/visto/visto-wordmark-reverse.svg" : "/assets/visto/visto-logo-texto.svg"}
      alt={alt}
      className={className}
      width="560"
      height="180"
    />
  );
}

function VistoIcon({ alt = "Visto", className }: { alt?: string; className?: string }) {
  return (
    <img
      src="/assets/visto/visto-logo-simbolo.svg"
      alt={alt}
      className={className}
      width="550"
      height="660"
    />
  );
}

function VistoLogoLockup({ reversed = false, alt = "Visto — precisão e controle", className }: { reversed?: boolean; alt?: string; className?: string }) {
  return (
    <img
      src={reversed ? "/assets/visto/visto-logo-paleta-whatsapp-reverse.svg" : "/assets/visto/visto-logo-paleta-whatsapp.svg"}
      alt={alt}
      className={className}
      width="1200"
      height="1200"
    />
  );
}

function HawksWordmark({
  reversed = false,
  alt = "HAWKS BI",
  className,
}: {
  reversed?: boolean;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      src={reversed ? "/assets/brand-kit/hawks-bi-wordmark-reverse.svg" : "/assets/brand-kit/hawks-bi-wordmark.svg"}
      alt={alt}
      className={className}
      width="2111"
      height="745"
    />
  );
}

type VistoSurface = "paper" | "ink" | "orange";

function VistoMark({
  className,
  alt = "",
  surface = "paper",
}: {
  className?: string;
  alt?: string;
  surface?: VistoSurface;
}) {
  const source = {
    paper: "/assets/visto/visto-logo-paleta-whatsapp.svg",
    ink: "/assets/visto/visto-hex-mark-reverse.svg",
    orange: "/assets/visto/visto-hex-mark-reverse.svg",
  }[surface];

  return (
    <img
      src={source}
      alt={alt}
      className={className}
      width={surface === "paper" ? 550 : 128}
      height={surface === "paper" ? 660 : 128}
    />
  );
}

const DEMO_URL =
  import.meta.env.VITE_VISTO_DEMO_URL ??
  "mailto:contato@hawksbi.com.br?subject=Agendar%20demonstra%C3%A7%C3%A3o%20%E2%80%94%20Visto";
const LOGIN_URL = import.meta.env.VITE_VISTO_LOGIN_URL ?? "http://localhost:5174/login";
const HAWKS_SITE_URL = "https://hawksbi.com.br";

const navigation = [
  ["Produto", "#produto"],
  ["Como funciona", "#como-funciona"],
  ["Para quem é", "#para-quem"],
] as const;

function Arrow() {
  return (
    <span className="marketing-arrow" aria-hidden="true">
      ↗
    </span>
  );
}

function Action({
  href,
  children,
  secondary = false,
  external = false,
  tabIndex,
}: {
  href: string;
  children: string;
  secondary?: boolean;
  external?: boolean;
  tabIndex?: number;
}) {
  return (
    <a
      className={`marketing-action${secondary ? " marketing-action--secondary" : ""}`}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      aria-label={external ? `${children} (abre em nova aba)` : undefined}
      tabIndex={tabIndex}
    >
      <span>{children}</span>
      {!secondary && <Arrow />}
    </a>
  );
}

function StatusDot({ tone }: { tone: "orange" | "green" | "gray" }) {
  return <span className={`status-dot status-dot--${tone}`} aria-hidden="true" />;
}

function ChecklistScene() {
  const [view, setView] = useState<"visao" | "execucao" | "evidencia">("visao");

  return (
    <div className="scene-stage" data-hero-scene>
      <div className="scene-orbit scene-orbit--one" aria-hidden="true" />
      <div className="scene-orbit scene-orbit--two" aria-hidden="true" />
      <div className="scene-tilt" data-scene-tilt>
        <div className="device-mac" data-depth="board" aria-label="Visto no computador">
          <div className="device-mac__screen-shell">
            <span className="device-mac__camera" aria-hidden="true" />
            <div className="scene-board">
              <div className="scene-board__topbar">
                <div className="scene-board__brand">
                  <VistoMark className="scene-brand-mark" surface="paper" />
                  <strong>Visto</strong>
                </div>
                <div className="scene-board__topbar-right">
                  <span className="scene-demo-label">Dados fictícios</span>
                  <span className="scene-avatar">MC</span>
                </div>
              </div>

              <div className="scene-board__body">
                <aside className="scene-sidebar" aria-label="Menu do produto">
                  <span className="scene-sidebar__active"><i />Visão geral</span>
                  <span><i />Rotinas</span>
                  <span><i />Setores</span>
                  <span><i />Relatórios</span>
                  <div className="scene-sidebar__bottom"><span><i />Configurações</span></div>
                </aside>

                <div className="scene-dashboard">
                  <div className="scene-dashboard__heading">
                    <div>
                      <span className="scene-overline">SEG · 18 AGO · MANHÃ</span>
                      <h3>Visão da operação</h3>
                    </div>
                    <span className="scene-filter" aria-hidden="true">Todos os setores <span>⌄</span></span>
                  </div>

                  <div className="scene-tabs" role="tablist" aria-label="Demonstração do Visto">
                    {[
                      ["visao", "Visão geral"],
                      ["execucao", "Execução"],
                      ["evidencia", "Evidência"],
                    ].map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        role="tab"
                        id={`scene-tab-${key}`}
                        aria-controls="scene-panel"
                        aria-selected={view === key}
                        className={view === key ? "is-active" : ""}
                        onClick={() => setView(key as typeof view)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {view === "visao" && (
                    <div className="scene-dashboard__content" id="scene-panel" role="tabpanel" aria-labelledby="scene-tab-visao">
                      <div className="scene-kpi-row">
                        <div className="scene-kpi scene-kpi--main">
                          <div><span>Rotinas de hoje</span><strong>12</strong></div>
                          <div className="scene-progress"><span className="scene-progress__fill" /></div>
                          <small>9 concluídas <b>·</b> 3 em atenção</small>
                        </div>
                        <div className="scene-kpi"><span>Em atenção</span><strong>03</strong><small>exigem ação hoje</small></div>
                        <div className="scene-kpi"><span>Setores ativos</span><strong>04</strong><small>todos com rotina hoje</small></div>
                      </div>
                      <div className="scene-main-grid">
                        <div className="scene-checklist">
                          <div className="scene-module-heading"><span>Fila prioritária</span><b>3 itens</b></div>
                          {[
                            ["Temperatura da câmara fria", "Produção · 08:05", "orange", "Atenção"],
                            ["Limpeza de bancada", "Produção · 08:16", "orange", "Atrasada"],
                            ["Conferência final", "Expedição · 08:42", "green", "Concluída"],
                          ].map(([title, detail, tone, status]) => (
                            <div className="scene-check-row" key={title}>
                              <span className="scene-check-box">{tone === "green" ? "✓" : ""}</span>
                              <div><strong>{title}</strong><span>{detail}</span></div>
                              <em className={`scene-row-status scene-row-status--${tone}`}>{status}</em>
                            </div>
                          ))}
                        </div>
                        <div className="scene-attention-card">
                          <div className="scene-module-heading"><span>Agora</span><b className="scene-badge">1 crítica</b></div>
                          <StatusDot tone="orange" />
                          <strong>Temperatura fora da faixa</strong>
                          <p>Câmara fria 02 precisa de correção e novo registro.</p>
                          <a href="#produto">Abrir ocorrência <span>↗</span></a>
                        </div>
                      </div>
                    </div>
                  )}

                  {view === "execucao" && (
                    <div className="scene-dashboard__content scene-dashboard__content--single" id="scene-panel" role="tabpanel" aria-labelledby="scene-tab-execucao">
                      <div className="scene-execution-heading"><span>Fila do dia</span><strong>O que precisa acontecer agora.</strong></div>
                      {[
                        ["08:00", "Limpeza de bancada", "Produção · 8 itens", "Atrasada"],
                        ["13:30", "Conferência final", "Expedição · 6 itens", "Em andamento"],
                        ["15:00", "Temperatura da vitrine", "Atendimento · 2 itens", "Pendente"],
                      ].map(([time, title, detail, status]) => (
                        <div className="scene-execution-row" key={time}>
                          <time>{time}</time><div><strong>{title}</strong><span>{detail}</span></div><em>{status}</em>
                        </div>
                      ))}
                    </div>
                  )}

                  {view === "evidencia" && (
                    <div className="scene-dashboard__content scene-dashboard__content--single" id="scene-panel" role="tabpanel" aria-labelledby="scene-tab-evidencia">
                      <div className="scene-execution-heading"><span>Registro em contexto</span><strong>O que aconteceu fica no mesmo lugar.</strong></div>
                      <div className="scene-record-card">
                        <div><span>Produção · Limpeza de bancada</span><b>Item 04 de 08</b></div>
                        <strong><StatusDot tone="orange" /> Não conforme</strong>
                        <p>Higienização refeita antes do início da produção.</p>
                        <small>Foto anexada · 08:16 · histórico disponível</small>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="device-mac__base" aria-hidden="true"><span /></div>
        </div>

        <div className="device-phone" data-depth="phone" aria-hidden="true">
          <div className="device-phone__screen">
            <div className="device-phone__status"><span>9:41</span><span className="device-phone__signal"><i /><i /><i /></span></div>
            <div className="device-phone__brand"><VistoMark className="device-phone__mark" surface="paper" /><strong>Visto</strong></div>
            <div className="device-phone__heading"><span>Rotina da manhã</span><strong>3/5</strong></div>
            <div className="device-phone__progress"><span /></div>
            <div className="device-phone__list">
              <div className="device-phone__row device-phone__row--done">
                <span className="device-phone__check">✓</span>
                <div><strong>Higienizar bancada</strong><small>Produção · agora</small></div>
              </div>
              <div className="device-phone__row device-phone__row--done">
                <span className="device-phone__check">✓</span>
                <div><strong>Conferência final</strong><small>Expedição · agora</small></div>
              </div>
              <div className="device-phone__row device-phone__row--attention">
                <span className="device-phone__check" />
                <div><strong>Temperatura</strong><small>Próximo item</small></div>
              </div>
            </div>
            <div className="device-phone__saved"><span>✓</span> Registro salvo</div>
          </div>
        </div>

        <div className="scene-float-card scene-float-card--signal" data-depth="signal">
          <StatusDot tone="orange" />
          <div><strong>1 atenção agora</strong><span>Temperatura · Produção</span></div>
          <b>↗</b>
        </div>
        <div className="scene-float-card scene-float-card--evidence" data-depth="evidence">
          <span className="scene-float-card__check">✓</span>
          <div><strong>Registro salvo</strong><span>com evidência vinculada</span></div>
        </div>
      </div>
      <p className="scene-caption"><span />Interface ilustrativa · cenário de demonstração</p>
    </div>
  );
}

function useSaaSMotion(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    root.dataset.motionReady = "true";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from("[data-hero-label]", { opacity: 0, y: 14, duration: 0.45 })
        .from("[data-hero-title]", { opacity: 0, y: 26, duration: 0.7 }, "-=0.22")
        .from("[data-hero-copy]", { opacity: 0, y: 18, duration: 0.55 }, "-=0.3")
        .from("[data-hero-actions]", { opacity: 0, y: 16, duration: 0.5 }, "-=0.25")
        .from("[data-hero-scene]", { opacity: 0, y: 28, rotateX: 5, duration: 0.9 }, "-=0.3")
        .from("[data-depth]", { opacity: 0, y: 18, duration: 0.55, stagger: 0.08 }, "-=0.48")
        .fromTo(".scene-progress__fill", { scaleX: 0 }, { scaleX: 1, duration: 0.9 }, "-=0.48");

      ScrollTrigger.batch("[data-gsap-reveal]", {
        start: "top 86%",
        once: true,
        onEnter: (elements) => gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: "auto",
        }),
      });

      const tilt = root.querySelector<HTMLElement>("[data-scene-tilt]");
      const canTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (tilt && canTilt) {
        const move = (event: PointerEvent) => {
          const bounds = tilt.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          gsap.to(tilt, { rotateY: x * 5, rotateX: y * -4, duration: 0.65, ease: "power3.out", overwrite: "auto" });
          gsap.to(root.querySelectorAll<HTMLElement>("[data-depth]"), { x: x * 8, y: y * -5, duration: 0.65, ease: "power3.out", overwrite: "auto" });
        };
        const leave = () => {
          gsap.to(tilt, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
          gsap.to(root.querySelectorAll<HTMLElement>("[data-depth]"), { x: 0, y: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
        };
        tilt.addEventListener("pointermove", move);
        tilt.addEventListener("pointerleave", leave);
        return () => {
          tilt.removeEventListener("pointermove", move);
          tilt.removeEventListener("pointerleave", leave);
        };
      }

      return undefined;
    }, root);

    return () => context.revert();
  }, [rootRef]);
}

export function VistoLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const lastMenuLink = useRef<HTMLAnchorElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  useSaaSMotion(rootRef);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const focusTimer = window.setTimeout(() => firstLink.current?.focus(), 120);
    return () => window.clearTimeout(focusTimer);
  }, [menuOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menuOpen) return;
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  function trapMenuFocus(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key !== "Tab") return;
    if (event.shiftKey && document.activeElement === firstLink.current) {
      event.preventDefault();
      lastMenuLink.current?.focus();
    }
    if (!event.shiftKey && document.activeElement === lastMenuLink.current) {
      event.preventDefault();
      firstLink.current?.focus();
    }
  }

  return (
    <main ref={rootRef} id="conteudo" className="marketing-page">
      <a className="marketing-skip-link" href="#conteudo">Pular para o conteúdo</a>

      <header className="marketing-header">
        <div className="marketing-nav-island">
          <a className="marketing-brand" href="#inicio" aria-label="Visto — início · HAWKS BI">
            <span className="marketing-brand__visto">
              <VistoIcon className="marketing-brand__icon" />
              <VistoWordmark className="marketing-brand__wordmark" alt="Visto" />
            </span>
            <span className="marketing-brand__divider" aria-hidden="true" />
            <HawksWordmark className="marketing-brand__maker" />
          </a>
          <nav className="marketing-nav-links" aria-label="Navegação principal">
            {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="marketing-nav-actions">
            <Action href={HAWKS_SITE_URL} external secondary>Site HAWKS BI</Action>
            <a className="marketing-login" href={LOGIN_URL}>Já sou cliente</a>
            <Action href={DEMO_URL}>Ver demonstração</Action>
          </div>
          <button
            ref={menuButton}
            className={`marketing-menu-button${menuOpen ? " is-open" : ""}`}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="marketing-mobile-menu"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span>{menuOpen ? "Fechar" : "Menu"}</span><i aria-hidden="true"><b /><b /></i>
          </button>
        </div>
        <aside
          id="marketing-mobile-menu"
          className={`marketing-mobile-menu${menuOpen ? " is-open" : ""}`}
          aria-hidden={!menuOpen}
          aria-modal="true"
          role="dialog"
          onKeyDown={trapMenuFocus}
        >
          <nav aria-label="Navegação mobile">
            {navigation.map(([label, href], index) => (
              <a key={href} ref={index === 0 ? firstLink : undefined} href={href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>{label}
              </a>
            ))}
          </nav>
          <div className="marketing-mobile-menu__actions">
            <div className="marketing-mobile-menu__buttons">
              <Action href={DEMO_URL} tabIndex={menuOpen ? 0 : -1}>Ver demonstração</Action>
              <Action href={HAWKS_SITE_URL} external secondary tabIndex={menuOpen ? 0 : -1}>Site HAWKS BI</Action>
            </div>
            <a ref={lastMenuLink} href={LOGIN_URL} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>Entrar no sistema</a>
          </div>
        </aside>
      </header>

      <section id="inicio" className="marketing-hero" aria-labelledby="hero-title">
        <div className="marketing-frame marketing-hero__layout">
          <div className="marketing-hero__copy">
            <p className="marketing-eyebrow" data-hero-label><span className="eyebrow-dot" /> Visto · rotinas operacionais</p>
            <h1 id="hero-title" data-hero-title>Rotinas claras. <em>Respostas no tempo certo.</em></h1>
            <p className="marketing-lede" data-hero-copy>
              Configure rotinas por setor, turno e dia. O time executa no local; a gestão acompanha pendências, temperaturas e correções.
            </p>
            <div className="marketing-hero__actions" data-hero-actions>
              <Action href={DEMO_URL}>Ver o Visto</Action>
              <a className="marketing-text-link" href="#como-funciona">Entender o fluxo <span aria-hidden="true">↓</span></a>
            </div>
            <div className="marketing-hero__meta" data-hero-copy>
              <span><StatusDot tone="green" /> Feito para operações por setor</span>
              <span>Execução, status e registro no mesmo fluxo</span>
            </div>
          </div>
          <ChecklistScene />
        </div>
      </section>

      <section className="marketing-proof-strip" aria-label="Resumo do produto">
        <div className="marketing-frame marketing-proof-strip__grid">
          <div data-gsap-reveal><strong>01</strong><span>Configure a rotina</span><p>Defina setores, turnos, dias, horários e itens.</p></div>
          <div data-gsap-reveal><strong>02</strong><span>Execute no local</span><p>O operador responde item a item e registra a correção.</p></div>
          <div data-gsap-reveal><strong>03</strong><span>Acompanhe o desvio</span><p>A gestão encontra pendências, temperaturas e status.</p></div>
        </div>
      </section>

      <section id="como-funciona" className="marketing-flow" aria-labelledby="flow-title">
        <div className="marketing-frame">
          <div className="marketing-section-heading" data-gsap-reveal>
            <p className="marketing-eyebrow"><span className="eyebrow-dot" /> Como funciona</p>
            <h2 id="flow-title">Do cadastro à resposta em três passos.</h2>
            <p>O Visto conecta a rotina configurada à execução e ao acompanhamento da gestão.</p>
          </div>
          <div className="marketing-flow__rail">
            <article className="flow-card flow-card--featured" data-gsap-reveal>
              <div className="flow-card__number">01 <span>· configurar</span></div>
              <div className="flow-card__visual flow-visual--configure"><span className="flow-line" /><span className="flow-line flow-line--short" /><b>Rotina da manhã</b><small>Produção · 08:00</small></div>
              <h3>Configure cada rotina.</h3>
              <p>Defina setor, turno, dias, horário, itens, limites de temperatura e exigência de foto.</p>
            </article>
            <article className="flow-card" data-gsap-reveal>
              <div className="flow-card__number">02 <span>· executar</span></div>
              <div className="flow-card__visual flow-visual--execute"><span className="flow-check">✓</span><b>6 de 8 itens</b><small>Registro em andamento</small></div>
              <h3>Execute no momento certo.</h3>
              <p>O operador abre a rotina, responde item a item e registra a correção quando necessário.</p>
            </article>
            <article className="flow-card" data-gsap-reveal>
              <div className="flow-card__number">03 <span>· agir</span></div>
              <div className="flow-card__visual flow-visual--act"><StatusDot tone="orange" /><b>1 atenção agora</b><small>Câmara fria 02</small></div>
              <h3>Acompanhe a exceção.</h3>
              <p>A gestão vê o status, recebe notificações de início e fim e age com contexto.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="produto" className="marketing-product" aria-labelledby="product-title">
        <div className="marketing-frame">
          <div className="marketing-product__heading" data-gsap-reveal>
            <div><p className="marketing-eyebrow marketing-eyebrow--light"><span className="eyebrow-dot" /> Dentro do Visto</p><h2 id="product-title">Tudo que importa fica ligado à rotina.</h2></div>
            <p>Rotinas, respostas, temperaturas, correções e status ficam no mesmo lugar para o time executar e a gestão acompanhar.</p>
          </div>
          <div className="marketing-product__bento">
            <div className="bento-card bento-card--main" data-gsap-reveal>
              <div className="bento-card__label"><span>Fila do dia</span><b>Execução</b></div>
              <div className="bento-checklist-shell">
                <div className="bento-checklist-head"><span>Rotinas de hoje</span><strong>09 / 12</strong></div>
                {[
                  ["Limpeza de bancada", "Produção", "08:16", "done"],
                  ["Conferência final", "Expedição", "08:42", "done"],
                  ["Temperatura da câmara", "Produção", "Agora", "attention"],
                ].map(([title, sector, time, status]) => <div className="bento-check-item" key={title}><span className={`bento-checkbox bento-checkbox--${status}`}>{status === "done" ? "✓" : ""}</span><div><strong>{title}</strong><small>{sector}</small></div><time>{time}</time></div>)}
              </div>
              <p>O operador começa pelo que precisa acontecer — sem procurar em planilhas.</p>
            </div>
            <div className="bento-card bento-card--attention" data-gsap-reveal>
              <div className="bento-card__label"><span>Gestão por exceção</span><b>Agora</b></div>
              <div className="bento-alert-icon"><StatusDot tone="orange" /></div>
              <strong>Temperatura fora da faixa</strong>
              <p>O desvio fica visível para a próxima ação.</p>
              <a href="#solicitar-demonstracao">Ver ocorrência <span>↗</span></a>
            </div>
            <div className="bento-card bento-card--evidence" data-gsap-reveal>
              <div className="bento-card__label"><span>Registro da execução</span><b>Histórico</b></div>
              <div className="bento-evidence-row"><span className="bento-evidence-thumb">IMG</span><div><strong>Correção concluída</strong><small>Resposta · horário · foto quando exigida</small></div><span>✓</span></div>
              <p>Cada resposta permanece ligada ao item e à rotina certa.</p>
            </div>
          </div>
          <p className="marketing-disclaimer">Interface ilustrativa para demonstração comercial · os dados exibidos são fictícios.</p>
        </div>
      </section>

      <section id="para-quem" className="marketing-audience" aria-labelledby="audience-title">
        <div className="marketing-frame marketing-audience__layout">
          <div className="marketing-audience__heading" data-gsap-reveal><p className="marketing-eyebrow"><span className="eyebrow-dot" /> Para quem é</p><h2 id="audience-title">Uma visão para quem executa e acompanha a rotina.</h2><p>Cada papel vê o que precisa fazer, revisar ou administrar.</p></div>
          <div className="audience-list">
            <article data-gsap-reveal><span>01</span><div><h3>Operador</h3><p>Itens da rotina, ordem e status para executar sem dúvida.</p></div><b>Executar <i>↗</i></b></article>
            <article data-gsap-reveal><span>02</span><div><h3>Gestor</h3><p>Pendências, andamento, conclusão e correções para agir.</p></div><b>Acompanhar <i>↗</i></b></article>
            <article data-gsap-reveal><span>03</span><div><h3>Administrador</h3><p>Setores, rotinas, grupos de acesso e configurações.</p></div><b>Organizar <i>↗</i></b></article>
          </div>
        </div>
      </section>

      <section id="solicitar-demonstracao" className="marketing-final-cta" aria-labelledby="cta-title">
        <div className="marketing-frame marketing-final-cta__layout" data-gsap-reveal>
          <div><p className="marketing-eyebrow"><span className="eyebrow-dot" /> Visto · HAWKS BI</p><h2 id="cta-title">Veja a rotina funcionando.<br /><em>Decida com o registro certo.</em></h2></div>
          <div>
            <p>Agende uma demonstração guiada e veja como configurar, executar e acompanhar uma rotina no Visto.</p>
            <p className="marketing-company-note">Visto é um produto da HAWKS BI.</p>
            <div className="marketing-final-cta__actions">
              <Action href={DEMO_URL}>Agendar demonstração</Action>
              <Action href={HAWKS_SITE_URL} external secondary>Conhecer a HAWKS BI</Action>
            </div>
          </div>
        </div>
      </section>

      <footer className="marketing-footer">
        <div className="marketing-frame marketing-footer__layout">
          <div className="marketing-footer__brand"><VistoLogoLockup className="marketing-footer__product" reversed /><span className="marketing-footer__divider" aria-hidden="true" /><HawksWordmark className="marketing-footer__maker" reversed /></div>
          <nav aria-label="Links do rodapé"><a href="#produto">Produto</a><a href={LOGIN_URL}>Entrar no sistema</a><a href={DEMO_URL}>Agendar demonstração</a><a href={HAWKS_SITE_URL} target="_blank" rel="noreferrer">HAWKS BI ↗</a></nav>
          <p>Visto · Rotinas por setor, execução e acompanhamento.</p>
        </div>
      </footer>
    </main>
  );
}
