# Validation report

Last verified locally: **17 November 2026**.

This report distinguishes automated HTTP checks from browser interaction checks. Passing these checks is not a claim of complete accessibility compliance, production readiness for a real supplier, or measured Core Web Vitals.

## Automated checks

| Check                    | Result    | Scope                                                                                                      |
| ------------------------ | --------- | ---------------------------------------------------------------------------------------------------------- |
| `npm run build`          | Passed    | Optimized Next.js production build and TypeScript compilation                                              |
| `npm run typecheck`      | Passed    | Strict TypeScript checking                                                                                 |
| `npm run lint`           | Passed    | ESLint, React Hooks, Next.js, and JSX accessibility rules                                                  |
| `npm test`               | 12 passed | Shared validation, API request limits, origin/content checks, demo mode, and mocked live-delivery outcomes |
| `npm run test:e2e`       | 10 passed | HTTP integration scenarios against the production server                                                   |
| `npm run check:links`    | Passed    | 44 pages, 152 distinct links, 86 internal targets, 64 fragment checks                                      |
| `npm run check:contrast` | 30 passed | Selected semantic foreground/background pairs                                                              |

HTTP integration checks cover localized routes and 404 responses, one H1 and correct document language, language-switch URLs, query-based filters, material selection passed into the inquiry form, image/font responses, and a same-origin demo POST.

The latest internal-link report does **not** request external sites. ForestCom and Rainforest Trust returned HTTP 200 during an earlier optional external check; availability can change.

Reports:

- [Internal links](validation/link-checks.json)
- [Color contrast](validation/color-contrast.json)
- [Earlier responsive geometry checks](validation/responsive-checks.json)

## Browser checks

Portfolio screenshots were captured from the actual Next.js production server:

| Page                            | Viewport    | Artifact                                                |
| ------------------------------- | ----------- | ------------------------------------------------------- |
| English homepage                | 1440 × 1000 | [Desktop homepage](docs/screenshots/home-desktop.png)   |
| English industrial applications | 1440 × 1000 | [Applications](docs/screenshots/industries-desktop.png) |
| English material catalog        | 1440 × 1000 | [Catalog](docs/screenshots/catalog-desktop.png)         |
| English homepage                | 390 × 1000  | [Mobile homepage](docs/screenshots/home-mobile.png)     |

The applications page and mobile homepage showed no horizontal document overflow in the screenshot session. These screenshots are a targeted visual check, not a full regression of every route at every viewport.

Earlier browser interaction checks confirmed:

- Navigation from a footer link to a different page resets scroll to the top.
- A footer link to the already-open catalog resets scroll from 2219 px to zero.
- Header and footer logos return to the localized homepage at `#top`.
- An application anchor opens the corresponding section below the fixed header.
- Production tabs change content by click and ArrowRight.
- Mobile navigation locks background scrolling, closes with Escape, and returns focus to its trigger.

The earlier responsive run completed 32 of 36 planned geometry checks before a browser interruption. Completed checks reported no horizontal overflow. The four unfinished checks were not claimed as passing.

## Asset checks

- 14 original conceptual images; 84 AVIF/WebP variants.
- 12 self-hosted Manrope font files.
- Ukrainian and US flag assets return HTTP 200.
- SVG, PNG, and ICO favicon assets return HTTP 200; the mark was visually inspected at 180 px and 32 px.
- The original logo remains separate from derived header/favicon assets.

## Limits and deployment conditions

- Real webhook delivery and Redis are not connected in the default demo. Delivery success/failure paths are tested with a mocked provider.
- Without a trusted client-IP adapter, the rate-limit key is shared. Keep `RATE_LIMIT_TRUST_CF_IP=false` on Vercel; enabling it there would trust an unverified header.
- Demo rate limits are process-local and can reset with a server instance. Live mode requires distributed limits.
- Reduced-motion support exists in CSS/Motion; a fresh system-level preference toggle was not tested during the screenshot session.
- No current Lighthouse, Core Web Vitals, screen-reader certification, or production load-test results are asserted.
- Contact and legal pages are demonstration content. A real commercial launch needs actual business details, reviewed legal content, and configured delivery.
- Search indexing remains disabled by default for the portfolio demo.
