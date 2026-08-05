---
title: Design review of Smile Check checklist SaaS landing page
slug: smile-check-landing
panel: [don-norman-designer, jared-spool-designer, dieter-rams-designer]
created: 2026-08-01
target: src/App.tsx, src/landing.css, index.html
target_lines: 2100
---

# Design review: Smile Check checklist SaaS landing page

## Context and evidence

The target is an independent Vite/React commercial landing page for Smile Check. The integrated Smile Check app on `localhost:5174` remains a separate product surface: its public marketing route is `/landing`, while the authenticated product redirects `/` to `/login` without a session. The standalone page does not import the application’s routes, styles, or code.

The visual direction was deliberately changed after review: away from HAWKS BI’s institutional/editorial service page and toward a checklist SaaS product page. The HAWKS reference contributed only the useful motion language — staged hero entrance, state selection, scroll reveals, and reduced-motion awareness. The orange/ink/paper palette and official wordmark remain as the trust layer.

Playwright proof is saved under `public/assets/evidence/`:

- `hawks-site-hero-reference.png` — the institutional reference used for motion and identity comparison.
- `smile-check-saas-hero.png` — desktop first viewport.
- `smile-check-saas-mobile.png` — mobile first viewport.
- `smile-check-saas-full.png` — full-page capture after triggering all reveal states.
- `smile-check-saas-print.png` — print-emulated capture with reveal content forced visible.

## Per-persona verdicts

### Don Norman

**Verdict:** The new first viewport makes the product category and next step easier to understand: “checklist” is explicit, the product is visible immediately, and the CTA is attached to a concrete dashboard scene.

The buyer can now infer:

- Smile Check is an operational checklist product, not a general HAWKS BI service page.
- The workflow is configure → execute → act on the exception.
- The interface serves both the operator and the manager.
- The CTA is a guided demonstration, with the local login route available for existing customers.

Remaining comprehension risks:

- `mailto:` remains the default demo destination, so the post-click experience is not yet a measurable, confirmed funnel.
- The hero and bento use illustrative data. The fictitious-data label is honest, but authentic seeded product captures will be stronger proof.
- The primary buyer and expected demo response time are still not stated.

### Jared Spool

**Verdict:** The page now earns attention through a single product mental model instead of a long institutional inventory. The strongest proof sequence is visible in the hero and repeated once in the dark product section: queue → completion → exception → evidence.

What is working:

- The first screen pairs a commercial claim with a believable interface object.
- The proof strip compresses the story into three memorable stages.
- The interactive tabs let a visitor inspect overview, execution, and evidence without leaving the page.
- Motion is tied to hierarchy and product relationships; it is not the narrative itself.

What still needs product evidence:

- The figures such as `12`, `9 / 12`, and `92%` are scenario data and must never be positioned as customer outcomes.
- A real demo destination and CTA event instrumentation are needed before launch.
- The next test should be a five-second comprehension test with one operator and one manager: identify the product, identify the first action, and name the value of the evidence.

### Dieter Rams

**Verdict:** The redesign is more restrained and product-led. HAWKS BI is present as the maker, while the Smile Check product owns the visual hierarchy. The page uses one primary dashboard scene, one workflow rail, one bento proof section, and a concise audience section.

The main restraint decisions are intentional:

- The hero is a light SaaS shell with a dark product object, not a full-bleed institutional composition.
- Rounded corners are reserved for product surfaces and clear interaction groups.
- The orange is a signal color for action and exception, not a background gradient system.
- CSS 3D provides depth without a heavy 3D runtime; GSAP handles transform/opacity choreography.
- The disclaimer remains close to synthetic product proof instead of hiding it in the footer.

## Where they agree

1. Smile Check must be the subject; HAWKS BI should remain a quiet trust mark.
2. The product scene should explain a buyer’s mental model, not decorate the page.
3. Illustrative data is acceptable for explanation only when it is clearly marked as fictitious.
4. The conversion path should end in a real, measurable demo experience.
5. Motion should reveal relationships — queue, exception, evidence, decision — and respect reduced-motion preferences.

## Highest-leverage next change

Replace the default `mailto:` CTA with a measurable demo destination and replace the illustrative dashboard with one permissioned, redacted sequence from the real product. Keep the current scene as the fallback for environments where product access is unavailable.

## Suggested next step

Connect `VITE_SMILE_CHECK_DEMO_URL` to the real scheduling or lead-capture endpoint, instrument the hero and final CTA separately, and run the five-second comprehension test against the live product proof.
