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
| `npm run test:e2e`       | 11 passed | HTTP integration scenarios against the production server                                                   |
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

- 24 original conceptual images; 144 AVIF/WebP variants.
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

## Responsive glass and editorial layout refinement

The three-column editorial grid still reserved a 60 px ordinal column after decorative numbers were removed. This placed the heading in the narrow column and allowed text to collide. All editorial breakpoints now use two minmax(0, ...) content columns, collapsing to a single column at 850 px. Explicit min-width and wrapping rules prevent long localized headings from overflowing.

Hero panels now use localized backdrop blur with opacity 0.86 on desktop and 0.72 on mobile, over a dark forest tint. The mobile panel and its actions are centered. Contrast is modeled over a white photograph at the more transparent mobile setting: approximately 5.95:1 for cream body text and 3.20:1 for the large lime heading. All 30 semantic contrast checks pass.

Desktop primary sections use the visible viewport minus the sticky header as their minimum height. Long content remains free to grow; no fixed-height clipping or forced scroll snapping is introduced. Mobile content sections use natural height with smaller spacing. Short desktop screens have separate hero typography rules.

Browser geometry checks: **119 completed, no detected text-line collisions or horizontal document overflow**. The historical run used the actual viewport dimensions recorded per result: 390×844: 13 checks, 1280×720: 66 checks, 1440×900: 12 checks, 1192×800: 6 checks, 360×640: 16 checks, 1440×700: 2 checks, 1440×600: 2 checks, 1024×768: 1 checks, 390×1000: 1 checks. A later full-route run explicitly asserts both target viewport sizes, as described below. Closed native disclosure content is excluded from collision detection. These automatic geometry checks do not replace visual inspection of every element.

Hero height matches the viewport minus the header at 1440×900, 1440×700, 1440×600, 1024×768, 390×844 and 360×640 in the checked Ukrainian cases; English is additionally checked at both short desktop heights and both mobile sizes. Screenshot inspection covers desktop/mobile hero and the repaired editorial rows. No JavaScript console errors were returned in the final page check.

Production build, TypeScript, lint, 10 HTTP integration scenarios and the 44-page internal-link crawl pass. Browser results: [layout-checks.json](validation/layout-checks.json). Visual evidence: [desktop glass](validation/screenshots/hero-desktop.png), [mobile glass](validation/screenshots/hero-mobile.png), [editorial columns](validation/screenshots/editorial-desktop.png). Homepage portfolio screenshots have been refreshed.

## Thematic internal page backgrounds

Ten separately generated images are saved in assets/originals/page-*-original.png. Each has AVIF and WebP files at widths 640, 1280 and 1536 px, bringing the image manifest to 24 originals and 144 optimized files. Original subjects and composition were inspected. Exact prompts are preserved in asset-manifest.json. Page-background assignment is shared by both locales.

All internal headings, including product details, article details, request and legal pages, now use a decorative photographic background plus the shared glass reading panel. Product/article-specific photographs remain below the header and load lazily. Background sources use sizes=100vw and high fetch priority. Each route retains exactly one H1 and its breadcrumb structure.

Production build, lint, TypeScript and **11 HTTP integration scenarios** pass. The additional scenario verifies the expected thematic background, decorative alt text, full-width responsive source and single H1 on all internal localized routes. All 144 optimized image files return HTTP 200; the internal-link crawl still covers 44 pages without failures. All 30 semantic contrast checks pass.

Final browser geometry run explicitly sets and asserts each new tab's viewport: **44 routes at 390×844 and the same 44 routes at 1440×900**. No visible heading/paragraph line collisions or horizontal document overflow were detected. Closed native disclosure content is excluded. Report: [page-background-checks.json](validation/page-background-checks.json). This is a geometry check, not a full accessibility audit. Visual spot checks cover the holding background on desktop/mobile and the applications header; background originals were also inspected.


## Increased glass transparency

Shared glass-panel opacity is now 0.72 on desktop and 0.64 on mobile (28% and 36% background transparency). This applies to the homepage and every internal page header. Backdrop blur remains local to the reading panel. The homepage heading accent uses the existing sunflower yellow to preserve legibility at the lower opacity. Against a white photograph behind the mobile panel, cream body text is approximately 4.58:1 and the large yellow accent is 3.26:1. All 30 selected contrast checks and the production build pass.


## Shared highlights and introduction viewport

The yellow navigation and homepage introduction now share one grid wrapper. Its minimum height equals 100svh minus the sticky header; the introduction fills the remaining row after the yellow cards. The introduction anchor points to this combined block. Mobile keeps natural content height so stacked cards and text are not clipped.

Browser measurements in both locales confirm header + combined block = viewport at 1920×1080, 1440×900, 1280×720, 1024×768 and 1440×600. Both mobile pages were also checked at 390×844 without horizontal overflow. Production build and lint pass. Report: [introduction-viewport-checks.json](validation/introduction-viewport-checks.json). Screenshot: [combined desktop view](validation/screenshots/introduction-desktop.png).


## Unified editorial text-and-photo screens

The hemp introduction, responsibility overview and grower overview now each contain copy and the following photograph inside one shared chapter. Desktop chapter height equals the viewport minus the header. The corporate copy uses two columns above the image; the hemp composition uses contain to retain all objects. Mobile returns to natural vertical flow.

24 browser measurements cover both languages and all three pages at 1440×900, 1280×720, 1024×600 and 390×844. Desktop chapters equal the available viewport height, photographs remain within the chapter with positive height, copy precedes the photograph without overlap, and no horizontal overflow was detected. Build, lint and all 11 HTTP scenarios pass. Report: [editorial-photo-screen-checks.json](validation/editorial-photo-screen-checks.json). Screenshot: [unified responsibility chapter](validation/screenshots/editorial-photo-screen.png).


## Grower invitation composition

The formerly sparse grower inquiry section now uses the existing page-contacts landscape as a decorative background and the shared translucent glass panel. Four bilingual prompts describe location/acreage, experience/crops, machinery/storage and expectations. The CTA retains the localized /request?type=grower destination.

Eight browser measurements cover both locales at 1440×900, 1280×720, 1024×600 and 390×844: the panel stays within its section and there is no horizontal overflow. Desktop section heights equal the viewport minus the header; mobile uses natural height. A desktop visual check and text-line collision scan passed. Production build, lint and all 11 HTTP scenarios pass. Reports: [grower-invitation-checks.json](validation/grower-invitation-checks.json), [screenshot](validation/screenshots/grower-invitation.png).
