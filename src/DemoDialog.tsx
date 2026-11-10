import { useEffect, useRef, useState, type FormEvent, type Ref } from "react";

const endpoint = "https://hawksbi.com.br/api/visto-demo";
const action = "visto-demo";
const contactEmail = "comercial@hawksbi.com.br";

type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let challengeScript: Promise<void> | undefined;

async function loadChallenge(signal: AbortSignal) {
  const response = await fetch(endpoint, { signal, credentials: "omit" });
  if (!response.ok) throw new Error("config");
  const { siteKey } = await response.json();
  if (typeof siteKey !== "string" || !siteKey) throw new Error("config");
  if (!window.turnstile) {
    challengeScript ??= new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      const timer = window.setTimeout(fail, 10000);

      function fail() {
        window.clearTimeout(timer);
        script.remove();
        challengeScript = undefined;
        reject(new Error("challenge"));
      }

      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = () => {
        if (!window.turnstile) return fail();
        window.clearTimeout(timer);
        resolve();
      };
      script.onerror = fail;
      document.head.append(script);
    });
    await challengeScript;
  }
  if (!window.turnstile) throw new Error("challenge");
  return { siteKey, turnstile: window.turnstile };
}

function normalizePhone(value: string) {
  if (!/^[+\d().\s-]+$/.test(value)) return null;
  const digits = value.replace(/\D/g, "");
  const local = digits.length > 11 && digits.startsWith("55") ? digits.slice(2) : digits;
  return /^[1-9]\d(?:[2-5]\d{7}|9\d{8})$/.test(local) ? `+55${local}` : null;
}

export function DemoDialog({
  active,
  dialogRef,
  onClose,
}: {
  active: boolean;
  dialogRef: Ref<HTMLDialogElement>;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<"form" | "sending" | "sent">("form");
  const sent = phase === "sent";
  const [error, setError] = useState("");
  const [challenge, setChallenge] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const form = useRef<HTMLFormElement>(null);
  const widget = useRef<HTMLDivElement>(null);
  const receipt = useRef<HTMLHeadingElement>(null);
  const token = useRef("");
  const pending = useRef(false);
  const submission = useRef<{ fields: string; id: string } | null>(null);

  function renewChallenge() {
    token.current = "";
    setChallenge("loading");
    setAttempt((previous) => previous + 1);
  }

  useEffect(() => {
    if (!active || sent) return;
    const element = widget.current;
    const abort = new AbortController();
    setChallenge("loading");
    let remove: (() => void) | undefined;
    const fail = () => {
      if (abort.signal.aborted) return;
      token.current = "";
      setChallenge("error");
    };

    loadChallenge(AbortSignal.any([abort.signal, AbortSignal.timeout(10000)]))
      .then(({ turnstile, siteKey }) => {
        if (!element || abort.signal.aborted) return;
        const id = turnstile.render(element, {
          sitekey: siteKey,
          action,
          language: "pt-br",
          appearance: "interaction-only",
          size: "flexible",
          callback: (value: string) => {
            if (abort.signal.aborted) return;
            token.current = value;
            setChallenge("ready");
          },
          "error-callback": fail,
          "timeout-callback": fail,
          "expired-callback": () => {
            if (abort.signal.aborted) return;
            token.current = "";
            setChallenge("loading");
          },
        });
        remove = () => turnstile.remove(id);
      })
      .catch(fail);

    return () => {
      abort.abort();
      token.current = "";
      remove?.();
    };
  }, [active, attempt, sent]);

  useEffect(() => {
    if (active && sent) receipt.current?.focus();
  }, [active, sent]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;

    const fields = new FormData(event.currentTarget);
    const phoneField = event.currentTarget.elements.namedItem("phone") as HTMLInputElement;
    const phone = normalizePhone(String(fields.get("phone")));
    if (!phone) {
      phoneField.setCustomValidity("Informe um WhatsApp válido com DDD.");
      phoneField.reportValidity();
      return;
    }
    if (!token.current) {
      setError("Aguarde a verificação para enviar o pedido.");
      return;
    }

    const lead = {
      name: String(fields.get("name")).trim(),
      email: String(fields.get("email")).trim(),
      phone,
      website: String(fields.get("website")),
    };
    const serialized = JSON.stringify(lead);
    if (submission.current?.fields !== serialized) {
      submission.current = { fields: serialized, id: crypto.randomUUID() };
    }
    pending.current = true;
    setError("");
    setPhase("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, submissionId: submission.current.id, token: token.current }),
        signal: AbortSignal.timeout(25000),
      });
      if (!response.ok || (await response.json()).ok !== true) throw new Error("delivery");
      form.current?.reset();
      setPhase("sent");
    } catch {
      setError("Não conseguimos enviar seu pedido. Tente novamente em instantes.");
      setPhase("form");
      renewChallenge();
    } finally {
      pending.current = false;
    }
  }

  return (
    <dialog
      ref={dialogRef}
      id="visto-demo"
      className="marketing-demo"
      aria-labelledby="visto-demo-title"
      onClose={onClose}
    >
      <div className="marketing-demo__content">
        <button
          type="button"
          className="marketing-demo__close"
          aria-label="Fechar demonstração"
          onClick={(event) => event.currentTarget.closest("dialog")?.close()}
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
        {sent ? (
          <>
            <h2 id="visto-demo-title" ref={receipt} tabIndex={-1}>Pedido recebido</h2>
            <p>A equipe do Visto vai entrar em contato pelo WhatsApp para combinar a demonstração.</p>
            <button type="button" className="marketing-demo__submit" onClick={(event) => event.currentTarget.closest("dialog")?.close()}>
              Voltar ao site
            </button>
          </>
        ) : (
          <>
            <h2 id="visto-demo-title" tabIndex={-1}>Veja o Visto na prática</h2>
            <p>Deixe seu contato. Nossa equipe chama você no WhatsApp para combinar um horário.</p>
            <form ref={form} onSubmit={submit} aria-busy={phase === "sending"}>
              <label>
                Nome completo
                <input name="name" autoComplete="name" placeholder="Seu nome e sobrenome" required maxLength={100} pattern={String.raw`.*\S.*\S.*`} readOnly={phase === "sending"} />
              </label>
              <label>
                E-mail
                <input name="email" type="email" autoComplete="email" placeholder="voce@empresa.com.br" required maxLength={254} pattern={String.raw`[^\s@]+@[^\s@]+\.[^\s@]+`} readOnly={phase === "sending"} />
              </label>
              <label>
                WhatsApp com DDD
                <input name="phone" type="tel" autoComplete="tel" placeholder="(11) 99999-9999" required maxLength={24} readOnly={phase === "sending"} onChange={(event) => event.currentTarget.setCustomValidity("")} />
              </label>
              <div hidden>
                <label>Site <input name="website" autoComplete="off" tabIndex={-1} /></label>
              </div>
              <div ref={widget} className="marketing-demo__verification" />
              {challenge === "error" && (
                <p className="marketing-demo__error" role="status">
                  A verificação está indisponível. <button type="button" onClick={renewChallenge}>Tentar de novo</button> ou escreva para <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
                </p>
              )}
              {error && <p className="marketing-demo__error" role="alert">{error}</p>}
              <button type="submit" className="marketing-demo__submit" disabled={phase === "sending" || challenge === "error"}>
                {phase === "sending" ? "Enviando pedido…" : "Pedir demonstração"}
              </button>
            </form>
            <p className="marketing-demo__privacy">Usaremos seus dados para responder a este pedido.</p>
          </>
        )}
      </div>
    </dialog>
  );
}
