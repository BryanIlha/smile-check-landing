import { useEffect, useRef, useState, type FormEvent, type Ref } from "react";

const endpoint = "https://hawksbi.com.br/api/visto-demo";
const contactEmail = "comercial@hawksbi.com.br";
const timeZone = "America/Sao_Paulo";
const dayKey = new Intl.DateTimeFormat("en-CA", { timeZone, dateStyle: "short" });
const dayLabel = new Intl.DateTimeFormat("pt-BR", { timeZone, weekday: "long", day: "2-digit", month: "long" });
const dayOption = new Intl.DateTimeFormat("pt-BR", { timeZone, weekday: "short", day: "2-digit", month: "long" });
const hour = new Intl.DateTimeFormat("pt-BR", { timeZone, hour: "2-digit", minute: "2-digit" });

const contactInitial = { fullName: "", email: "", phone: "" };
const businessInitial = { employeeCount: "", biggestPain: "", businessName: "" };
const titles = ["Veja o Visto na prática", "Conte sobre o seu negócio", "Escolha um horário"] as const;
const descriptions = [
  "Comece pelos seus dados de contato.",
  "Assim a equipe prepara uma demonstração para a sua operação.",
  "A demonstração dura 1 hora. Os horários estão no fuso de Brasília.",
] as const;

type Slot = { id: string; startsAt: string; endsAt: string };
type Schedule = { siteKey: string; timeZone: string; slots: Slot[] };
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

async function loadChallenge() {
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
  return window.turnstile;
}

function normalizePhone(value: string) {
  if (!/^[+\d().\s-]+$/.test(value)) return null;
  const digits = value.replace(/\D/g, "");
  const local = digits.length > 11 && digits.startsWith("55") ? digits.slice(2) : digits;
  return /^[1-9]\d(?:[2-5]\d{7}|9\d{8})$/.test(local) ? `+55${local}` : null;
}

function splitFullName(value: string) {
  const [firstName = "", ...surname] = value.trim().split(/\s+/u);
  return { firstName, lastName: surname.join(" ") };
}

function validSlot(value: unknown): value is Slot {
  if (!value || typeof value !== "object") return false;
  const slot = value as Partial<Slot>;
  return typeof slot.id === "string" && !!slot.id &&
    typeof slot.startsAt === "string" && typeof slot.endsAt === "string" &&
    Date.parse(slot.endsAt) - Date.parse(slot.startsAt) === 60 * 60 * 1000;
}

function DemoCheck() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3.5 8 3 3 6-6" />
    </svg>
  );
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
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [contact, setContact] = useState(contactInitial);
  const [business, setBusiness] = useState(businessInitial);
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [scheduleStatus, setScheduleStatus] = useState<"loading" | "ready" | "error">("loading");
  const [scheduleAttempt, setScheduleAttempt] = useState(0);
  const [day, setDay] = useState("");
  const [selected, setSelected] = useState<Slot | null>(null);
  const [booking, setBooking] = useState<Slot | null>(null);
  const [sending, setSending] = useState(false);
  const [retryOnly, setRetryOnly] = useState(false);
  const [needsReview, setNeedsReview] = useState(false);
  const [error, setError] = useState("");
  const [challenge, setChallenge] = useState<"loading" | "ready" | "error">("loading");
  const [challengeAttempt, setChallengeAttempt] = useState(0);
  const widget = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const token = useRef("");
  const pending = useRef(false);
  const submission = useRef<{ fields: string; id: string } | null>(null);
  const isScheduling = step === 2 && !booking;
  const siteKey = schedule?.siteKey;

  function changeStep(next: 0 | 1 | 2) {
    setError("");
    setStep(next);
  }

  function renewChallenge() {
    token.current = "";
    setChallenge("loading");
    setChallengeAttempt((previous) => previous + 1);
  }

  useEffect(() => {
    if (!active || !heading.current) return;
    heading.current.closest("dialog")?.scrollTo({ top: 0, behavior: "instant" });
    heading.current.focus({ preventScroll: true });
  }, [active, step, booking]);

  useEffect(() => {
    if (!active || !isScheduling) return;
    const abort = new AbortController();
    setScheduleStatus("loading");

    fetch(endpoint, { signal: AbortSignal.any([abort.signal, AbortSignal.timeout(10000)]), credentials: "omit" })
      .then(async (response) => {
        if (!response.ok) throw new Error("availability");
        const result = (await response.json()) as Schedule;
        if (!result || result.timeZone !== timeZone || typeof result.siteKey !== "string" || !result.siteKey ||
          !Array.isArray(result.slots) || !result.slots.every(validSlot)) throw new Error("availability");
        if (abort.signal.aborted) return;
        const slots = [...result.slots].sort((left, right) => Date.parse(left.startsAt) - Date.parse(right.startsAt));
        setSchedule({ ...result, slots });
        setDay((previous) => slots.some((slot) => dayKey.format(new Date(slot.startsAt)) === previous)
          ? previous
          : slots[0] ? dayKey.format(new Date(slots[0].startsAt)) : "");
        setSelected((previous) => pending.current || submission.current
          ? previous
          : slots.find((slot) => slot.id === previous?.id) ?? null);
        setScheduleStatus("ready");
      })
      .catch(() => {
        if (!abort.signal.aborted) setScheduleStatus("error");
      });

    return () => abort.abort();
  }, [active, isScheduling, scheduleAttempt]);

  useEffect(() => {
    if (!active || !isScheduling || !siteKey) return;
    const element = widget.current;
    let disposed = false;
    let remove: (() => void) | undefined;
    const fail = () => {
      if (disposed) return;
      token.current = "";
      setChallenge("error");
    };
    setChallenge("loading");

    loadChallenge()
      .then((turnstile) => {
        if (!element || disposed) return;
        const id = turnstile.render(element, {
          sitekey: siteKey,
          action: "visto-demo",
          language: "pt-br",
          appearance: "interaction-only",
          size: "flexible",
          callback: (value: string) => {
            if (disposed) return;
            token.current = value;
            setChallenge("ready");
          },
          "error-callback": fail,
          "timeout-callback": fail,
          "expired-callback": fail,
        });
        remove = () => turnstile.remove(id);
      })
      .catch(fail);

    return () => {
      disposed = true;
      token.current = "";
      remove?.();
    };
  }, [active, isScheduling, siteKey, challengeAttempt]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;

    if (step === 0) {
      const { firstName, lastName } = splitFullName(contact.fullName);
      if (!lastName || firstName.length > 70 || lastName.length > 89) {
        const field = event.currentTarget.elements.namedItem("fullName") as HTMLInputElement;
        field.setCustomValidity(!lastName ? "Informe seu nome e sobrenome." : "O nome completo está longo demais.");
        field.reportValidity();
        return;
      }
      const phone = normalizePhone(contact.phone);
      if (!phone) {
        const field = event.currentTarget.elements.namedItem("phone") as HTMLInputElement;
        field.setCustomValidity("Informe um telefone válido com DDD.");
        field.reportValidity();
        return;
      }
      changeStep(1);
      return;
    }

    if (step === 1) {
      const pain = event.currentTarget.elements.namedItem("biggestPain") as HTMLTextAreaElement;
      if (!business.biggestPain.trim()) {
        pain.setCustomValidity("Conte qual é a principal dificuldade.");
        pain.reportValidity();
        return;
      }
      changeStep(2);
      return;
    }

    if (!selected) {
      setError("Selecione um horário para continuar.");
      return;
    }
    if (!token.current) {
      setError("Aguarde a verificação antes de confirmar.");
      return;
    }

    const lead = {
      ...splitFullName(contact.fullName),
      email: contact.email.trim(),
      phone: normalizePhone(contact.phone),
      employeeCount: Number(business.employeeCount),
      biggestPain: business.biggestPain.trim(),
      businessName: business.businessName.trim(),
    };
    const request = { lead, slotId: selected.id };
    const serialized = JSON.stringify(request);
    if (submission.current?.fields !== serialized) {
      submission.current = { fields: serialized, id: crypto.randomUUID() };
    }
    pending.current = true;
    setError("");
    setSending(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...request,
          website: new FormData(event.currentTarget).get("website") ?? "",
          submissionId: submission.current.id,
          token: token.current,
        }),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (response.status === 409 && result?.code === "slot_unavailable") {
        submission.current = null;
        setRetryOnly(false);
        setSelected(null);
        setError("Esse horário acabou de ser reservado. Escolha outro horário.");
        setScheduleAttempt((previous) => previous + 1);
        renewChallenge();
        return;
      }
      if (response.status === 403 && result?.code === "verification") {
        if (!retryOnly) submission.current = null;
        setError("A verificação expirou. Tente confirmar novamente.");
        renewChallenge();
        return;
      }
      if (response.status === 409 && result?.code === "submission_conflict") {
        setRetryOnly(true);
        setNeedsReview(true);
        return;
      }
      if (!response.ok || !validSlot(result?.booking) || result.booking.timeZone !== timeZone) {
        throw new Error("booking");
      }
      setBooking(result.booking);
      setContact(contactInitial);
      setBusiness(businessInitial);
    } catch {
      setRetryOnly(true);
      setError("Ainda não conseguimos confirmar. Tente novamente com o mesmo horário.");
      renewChallenge();
    } finally {
      pending.current = false;
      setSending(false);
    }
  }

  const days = new Map<string, string>();
  for (const slot of schedule?.slots ?? []) {
    const start = new Date(slot.startsAt);
    days.set(dayKey.format(start), dayOption.format(start));
  }
  const slots = schedule?.slots.filter((slot) => dayKey.format(new Date(slot.startsAt)) === day) ?? [];

  return (
    <dialog ref={dialogRef} id="visto-demo" className="marketing-demo" aria-labelledby="visto-demo-title" onClose={onClose}>
      <div className="marketing-demo__header">
        <button type="button" className="marketing-demo__close" aria-label="Fechar demonstração"
          onClick={(event) => event.currentTarget.closest("dialog")?.close()}>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
        <h2 id="visto-demo-title" ref={heading} tabIndex={-1}>{booking ? "Demonstração agendada" : titles[step]}</h2>
        {!booking && <p className="marketing-demo__intro">{descriptions[step]}</p>}
      </div>
      <div className="marketing-demo__content" key={booking ? "receipt" : step}>
        {booking ? (
          <>
            <div className="marketing-demo__receipt marketing-demo__receipt--confirmed">
              <span className="marketing-demo__receipt-mark"><DemoCheck /></span>
              <div>
                <strong>{dayLabel.format(new Date(booking.startsAt))}</strong>
                <span>{hour.format(new Date(booking.startsAt))} às {hour.format(new Date(booking.endsAt))} · horário de Brasília</span>
              </div>
            </div>
            <button type="button" className="marketing-demo__submit" onClick={(event) => event.currentTarget.closest("dialog")?.close()}>
              Voltar ao site
            </button>
          </>
        ) : (
          <>
            <form onSubmit={submit} aria-busy={sending}>
              {step === 0 && (
                <>
                  <label>Nome completo
                    <input name="fullName" autoComplete="name" placeholder="Nome e sobrenome" required maxLength={160}
                      value={contact.fullName} onChange={(event) => {
                        event.currentTarget.setCustomValidity("");
                        setContact({ ...contact, fullName: event.currentTarget.value });
                      }} />
                  </label>
                  <label>E-mail
                    <input name="email" type="email" autoComplete="email" placeholder="voce@empresa.com.br" required maxLength={254}
                      pattern={String.raw`[^\s@]+@[^\s@]+\.[^\s@]+`} value={contact.email}
                      onChange={(event) => setContact({ ...contact, email: event.currentTarget.value })} />
                  </label>
                  <label>Telefone com DDD
                    <input name="phone" type="tel" autoComplete="tel" placeholder="(11) 99999-9999" required maxLength={24}
                      value={contact.phone} onChange={(event) => {
                        event.currentTarget.setCustomValidity("");
                        setContact({ ...contact, phone: event.currentTarget.value });
                      }} />
                  </label>
                </>
              )}
              {step === 1 && (
                <>
                  <label>Quantos funcionários o negócio tem?
                    <input name="employeeCount" type="number" min={0} max={999999} step={1} required inputMode="numeric"
                      value={business.employeeCount} onChange={(event) => setBusiness({ ...business, employeeCount: event.currentTarget.value })} />
                  </label>
                  <label>Qual é a maior dificuldade hoje?
                    <textarea name="biggestPain" rows={3} maxLength={500} required placeholder="Ex.: acompanhar a execução das rotinas em cada turno."
                      value={business.biggestPain} onChange={(event) => {
                        event.currentTarget.setCustomValidity("");
                        setBusiness({ ...business, biggestPain: event.currentTarget.value });
                      }} />
                  </label>
                  <label>Nome do negócio
                    <input name="businessName" autoComplete="organization" required maxLength={150} pattern={String.raw`.*\S.*`}
                      value={business.businessName} onChange={(event) => setBusiness({ ...business, businessName: event.currentTarget.value })} />
                  </label>
                </>
              )}
              {step === 2 && (
                <>
                  {scheduleStatus === "loading" && !retryOnly && <p className="marketing-demo__status" role="status">Buscando horários disponíveis…</p>}
                  {scheduleStatus === "error" && !retryOnly && (
                    <p className="marketing-demo__error" role="status">
                      Os horários estão indisponíveis.{" "}
                      <button type="button" onClick={() => setScheduleAttempt((previous) => previous + 1)}>Tentar de novo</button>.
                    </p>
                  )}
                  {scheduleStatus === "ready" && !retryOnly && days.size === 0 && (
                    <p className="marketing-demo__status" role="status">Ainda não há horários abertos. Fale com a equipe pelo e-mail <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
                  )}
                  {scheduleStatus === "ready" && !retryOnly && days.size > 0 && (
                    <>
                      <label>Dia da demonstração
                        <select value={day} disabled={sending} onChange={(event) => {
                          setDay(event.currentTarget.value);
                          setSelected(null);
                          setError("");
                        }}>
                          {[...days].map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                        </select>
                      </label>
                      <fieldset className="marketing-demo__slots" disabled={sending}>
                        <legend>Horários livres</legend>
                        {slots.map((slot) => (
                          <label className="marketing-demo__slot" key={slot.id}>
                            <input type="radio" name="slot" value={slot.id} checked={selected?.id === slot.id} onChange={() => {
                              setSelected(slot);
                              setError("");
                            }} />
                            <span>{hour.format(new Date(slot.startsAt))}</span>
                          </label>
                        ))}
                      </fieldset>
                    </>
                  )}
                  {retryOnly && selected && (
                    <p className="marketing-demo__receipt">
                      <strong>{dayLabel.format(new Date(selected.startsAt))}</strong>
                      <span>{hour.format(new Date(selected.startsAt))} · horário de Brasília</span>
                    </p>
                  )}
                  {needsReview && (
                    <p className="marketing-demo__error" role="alert">
                      Precisamos verificar esta reserva. Escreva para <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
                    </p>
                  )}
                  <div hidden>
                    <label>Site <input name="website" autoComplete="off" tabIndex={-1} /></label>
                  </div>
                  <div ref={widget} className="marketing-demo__verification" />
                  {challenge === "error" && (
                    <p className="marketing-demo__error" role="status">
                      A verificação precisa ser refeita.{" "}
                      <button type="button" onClick={renewChallenge}>Tentar de novo</button>.
                    </p>
                  )}
                </>
              )}
              {error && <p className="marketing-demo__error" role="alert">{error}</p>}
              <div className="marketing-demo__actions">
                {step > 0 && !retryOnly && <button type="button" className="marketing-demo__back" disabled={sending}
                  onClick={() => changeStep(step === 2 ? 1 : 0)}>Voltar</button>}
                <button type="submit" className="marketing-demo__submit"
                  disabled={sending || needsReview || (step === 2 && (!selected || challenge !== "ready"))}>
                  {step !== 2 ? "Continuar" : sending ? "Confirmando…" : "Confirmar horário"}
                  {!sending && (
                    <span className="marketing-demo__action-mark" aria-hidden="true">
                      {step === 2 ? <DemoCheck /> : (
                        <svg className="marketing-demo__continue-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3.5 8h9m-4-4 4 4-4 4" />
                        </svg>
                      )}
                    </span>
                  )}
                </button>
              </div>
            </form>
            <p className="marketing-demo__privacy">Usaremos seus dados para organizar a demonstração.</p>
          </>
        )}
      </div>
    </dialog>
  );
}
