# Visto landing page

Independent Vite + React project for the Visto public marketing page.

## Run locally

```bash
npm install
npm run dev
```

The optional `VITE_VISTO_DEMO_URL` environment variable overrides the demonstration CTA. Without it, the page uses the HAWKS BI contact email. Set `VITE_VISTO_LOGIN_URL` to the authenticated product URL when the landing page is deployed separately; local development defaults to `http://localhost:5174/login`.

The page includes the official HAWKS BI wordmark under `public/assets/brand-kit` and does not import code, routes, styles, or dependencies from the Visto application. The commercial layer uses GSAP for the staged hero, scroll reveals, progress fill, and pointer-driven 3D tilt; the product scene itself is CSS 3D so it stays lightweight.

## Review evidence

The design audit is saved at `design/audits/visto-landing.md`. Playwright QA captures from the standalone target are kept under `public/assets/evidence/`.

The product app currently running on port `5174` is the integrated Visto project. Its public marketing route is `/landing`; the authenticated product starts at `/` and redirects to `/login` without a session. Keep that implementation distinction explicit when promoting changes.
