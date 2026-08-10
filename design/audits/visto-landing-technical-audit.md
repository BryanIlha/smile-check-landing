---
title: Technical audit of Visto landing page
slug: visto-landing-technical
created: 2026-08-06
target: src/App.tsx, src/landing.css, index.html
---

# Technical audit: Visto landing page

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3/4 | Strong semantics, focus treatment, skip link, tab roles, and reduced-motion fallback; demo handoff remains external. |
| 2 | Performance | 3/4 | Transform/opacity motion is bounded; GSAP adds a 112 kB gzip JS bundle and the font is third-party hosted. |
| 3 | Responsive Design | 3/4 | Dedicated 1080/820/580 breakpoints and mobile composition are present; live viewport verification was unavailable. |
| 4 | Theming | 3/4 | HAWKS BI-aligned tokens are centralized, with a few intentional one-off surface colors. |
| 5 | Implementation Integrity | 3/4 | Product-specific structure, clean detector result, and explicit illustrative-data labeling. |
| **Total** | | **15/20** | **Good; resolve the conversion handoff before launch.** |

## Implementation Integrity Verdict

**Pass.** The implementation expresses a coherent Visto system: the hero scene, workflow cards, bento proof, and audience list all share the configure → execute → exception → evidence model. `detect.mjs --json src/App.tsx` returned `[]` after the changes.

## Executive Summary

- Build: passed with `npm run build`.
- Deterministic detector: clean.
- `git diff --check`: clean.
- P0: 0 · P1: 1 · P2: 2 · P3: 0.
- Highest priority: replace the default `mailto:` fallback with a measurable demo flow.

## Detailed Findings

### [P1] Demo fallback is not a closed conversion flow

- **Location:** `src/App.tsx:29-32`
- **Category:** Implementation Integrity / Accessibility
- **Impact:** Visitors without a configured email client may fail to complete the primary action, and the fallback cannot emit reliable CTA or completion analytics.
- **Recommendation:** Set `VITE_VISTO_DEMO_URL` to the confirmed scheduler or lead-capture endpoint before launch; add an owned success/error state if the page later receives a form.
- **Suggested command:** `$impeccable harden`

### [P2] Font rendering depends on Google Fonts availability

- **Location:** `index.html:10-12`
- **Category:** Performance / Theming
- **Impact:** Offline, blocked, or slow font loading changes headline wrapping and can create layout shift before Instrument Sans arrives.
- **Recommendation:** Self-host the licensed Instrument Sans variable font for production, or verify the fallback stack at the largest headline and mobile breakpoints.
- **Suggested command:** `$impeccable optimize`

### [P2] Live responsive and motion behavior could not be verified in this run

- **Location:** whole surface
- **Category:** Responsive Design / Performance
- **Impact:** Source-level checks confirm the breakpoints and reduced-motion branch, but this run has no connected browser backend for fresh screenshots, focus-path testing, or frame inspection.
- **Recommendation:** Re-run the surface in a connected browser at wide desktop, 820px, and 375px widths; test the mobile menu, tabs, external CTA, and reduced-motion mode.
- **Suggested command:** `$impeccable audit`

## Patterns & Systemic Issues

- The page uses a healthy root token layer, but several local surface colors remain as hex values inside the illustrative product scene. Keep new colors inside the established token system unless they describe a distinct product state.
- Motion is now product-specific and bounded to the hero orbit, exception signal, completion check, and workflow lines. All are disabled under `prefers-reduced-motion`.

## Positive Findings

- Official HAWKS BI Instrument Sans, color direction, contact domain, and institutional URL are now reflected in the page.
- Mobile menu focus handling, focus-visible outlines, skip navigation, labelled landmarks, and tab semantics are present.
- Decorative mock controls are no longer exposed as fake interactive controls; the functional scene tabs remain keyboard reachable.
