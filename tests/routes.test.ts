import { test } from "node:test";
import assert from "node:assert/strict";
import { products, articles } from "../content/repository";
import { pageBackgrounds } from "../content/page-backgrounds";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const routePaths = [
  "",
  "/about",
  "/hemp",
  "/production",
  "/products",
  "/industries",
  "/sustainability",
  "/partners",
  "/knowledge",
  "/contacts",
  "/request",
  "/privacy",
  "/terms",
  ...products.map((p) => `/products/${p.slug}`),
  ...articles.map((a) => `/knowledge/${a.slug}`),
];
test("root redirects to Ukrainian", async () => {
  const r = await fetch(base, { redirect: "manual" });
  assert.ok([307, 308].includes(r.status));
  assert.equal(r.headers.get("location"), "/uk");
});
test(
  "all 44 localized routes render one H1, localized language and no indexing",
  { timeout: 120000 },
  async () => {
    for (const l of ["uk", "en"])
      for (const path of routePaths) {
        const r = await fetch(`${base}/${l}${path}`);
        assert.equal(r.status, 200, `${l}${path}`);
        const html = await r.text();
        assert.equal(
          (html.match(/<h1[ >]/g) || []).length,
          1,
          `${l}${path} H1`,
        );
        assert.ok(html.includes(`lang="${l}"`), `${l}${path} lang`);
        assert.ok(html.includes("noindex"), `${l}${path} noindex`);
        assert.ok(!html.includes("lorem ipsum"));
        const logoLinks = [
          ...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g),
        ].filter((match) => match[2].includes("/logo-header.svg"));
        assert.equal(
          logoLinks.length,
          2,
          `${l}${path} header and footer logos`,
        );
        assert.ok(
          logoLinks.every((match) => match[1].includes(`href="/${l}#top"`)),
          `${l}${path} home top links`,
        );
        if (path === "") assert.ok(html.includes('id="top"'));
      }
  },
);
test("catalog query persists in language link and material CTA carries product", async () => {
  const catalog = await (await fetch(`${base}/uk/products?type=hurd`)).text();
  assert.ok(catalog.includes("/en/products?type=hurd"));
  assert.ok(catalog.includes("Знайдено матеріалів"));
  const detail = await (await fetch(`${base}/en/products/hemp-hurd`)).text();
  assert.ok(detail.includes("/en/request?material=hemp-hurd"));
  assert.ok(detail.includes("Request an offer"));
});
test("unknown localized paths return 404", async () => {
  for (const l of ["uk", "en"]) {
    const r = await fetch(`${base}/${l}/no-such-page`);
    assert.equal(r.status, 404);
    const html = await r.text();
    assert.ok(html.includes(l === "uk" ? "Цей шлях" : "This path"));
  }
});
test("all optimized image files referenced by manifest exist and load", async () => {
  const fs = await import("node:fs/promises");
  const manifest = JSON.parse(
    await fs.readFile("asset-manifest.json", "utf8"),
  ) as { assets: { name: string; files: string[] }[] };
  assert.ok(manifest.assets.length > 0);
  assert.equal(
    new Set(manifest.assets.map((asset) => asset.name)).size,
    manifest.assets.length,
  );
  for (const name of new Set(Object.values(pageBackgrounds))) {
    assert.ok(
      manifest.assets.some((asset) => asset.name === name),
      `${name} is recorded in the manifest`,
    );
  }
  for (const a of manifest.assets) {
    assert.equal(a.files.length, 6);
    for (const file of a.files) {
      const r = await fetch(base + file);
      assert.equal(r.status, 200, file);
      assert.ok(Number(r.headers.get("content-length")) > 1000);
    }
  }
});

test("combined filters and empty results render honestly", async () => {
  const filtered = await (
    await fetch(`${base}/uk/products?type=hurd&application=construction`)
  ).text();
  assert.match(
    filtered.replaceAll(/<!--.*?-->/g, ""),
    /Знайдено матеріалів: 2/,
  );
  assert.ok(filtered.includes("<h3>Конопляна костриця</h3>"));
  assert.ok(!filtered.includes("<h3>Декортиковане волокно</h3>"));
  const empty = await (
    await fetch(`${base}/en/products?q=not-a-real-material`)
  ).text();
  assert.ok(empty.includes("No matching materials"));
  assert.ok(empty.includes("Reset filters"));
});

test(
  "all local navigation links resolve and local fonts load",
  { timeout: 120000 },
  async () => {
    const urls = new Set<string>();
    for (const l of ["uk", "en"]) {
      for (const path of routePaths) {
        const html = await (await fetch(`${base}/${l}${path}`)).text();
        for (const match of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
          const href = match[1].replaceAll("&amp;", "&");
          if (href.startsWith("/")) urls.add(href.split("#")[0]);
        }
      }
    }
    for (const url of urls)
      assert.equal((await fetch(base + url)).status, 200, url);
    for (const weight of [400, 500, 600])
      for (const subset of ["latin", "cyrillic", "cyrillic-ext", "latin-ext"])
        assert.equal(
          (
            await fetch(
              `${base}/fonts/manrope-${subset}-${weight}-normal.woff2`,
            )
          ).status,
          200,
        );
  },
);

test("real same-origin endpoint confirms demo validation", async () => {
  const origin = process.env.TEST_ORIGIN || new URL(base).origin;
  const response = await fetch(`${base}/api/inquiry`, {
    method: "POST",
    headers: { "content-type": "application/json", origin },
    body: JSON.stringify({
      locale: "en",
      kind: "supply",
      company: "Demo Manufacturing",
      person: "Demo Buyer",
      email: "buyer@example.com",
      country: "Ukraine",
      material: "hemp-hurd",
      unit: "consultation",
      application: "Building material trial",
      website: "",
      consent: true,
    }),
  });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.mode, "demo");
  assert.equal(result.delivered, false);
});

test("hemp guide, forest support and seed inquiry work in both locales", async () => {
  for (const locale of ["uk", "en"]) {
    const hemp = await (await fetch(`${base}/${locale}/hemp`)).text();
    assert.ok(hemp.includes("https://www.forestcom.org.ua/donate"));
    assert.ok(
      hemp.includes(
        "https://www.rainforesttrust.org/get-involved/ways-to-give/",
      ),
    );
    assert.ok(hemp.includes(locale === "uk" ? "Від шкарпеток" : "From socks"));
    assert.ok(hemp.includes(locale === "uk" ? "чохли" : "phone cases"));
    assert.ok(hemp.includes('class="story-prose"'));
    assert.ok(hemp.includes(locale === "uk" ? "Нове життя" : "A new life"));
    assert.ok(!hemp.includes('href="https://agriculture.ec.europa.eu'));
    assert.ok(!hemp.includes('href="https://eu-cap-network.ec.europa.eu'));
    assert.ok(!hemp.includes('href="https://igen.dk'));
    assert.ok(!hemp.includes("Швидко рости."));
    assert.ok(!hemp.includes("Рости відповідально."));

    const seed = await (
      await fetch(`${base}/${locale}/products/hemp-seeds`)
    ).text();
    assert.ok(seed.includes(`/${locale}/request?material=hemp-seeds`));
    assert.ok(
      seed.includes(locale === "uk" ? "окремі партії" : "separate batches"),
    );
    const form = await (
      await fetch(`${base}/${locale}/request?material=hemp-seeds`)
    ).text();
    assert.match(form, /<option value="hemp-seeds" selected="">/);
    const filtered = await (
      await fetch(`${base}/${locale}/products?type=seed`)
    ).text();
    assert.ok(filtered.includes(`/${locale}/products/hemp-seeds`));
    assert.ok(!filtered.includes("<h3>Decorticated hemp fiber</h3>"));
    assert.ok(!filtered.includes("<h3>Декортиковане волокно</h3>"));
  }
});

test("production captions precede images and actions contain no decorative arrows", async () => {
  const home = await (await fetch(`${base}/uk`)).text();
  assert.ok(
    home.indexOf("<h3>Вирощування</h3>") <
      home.indexOf('src="/images/field-1280.webp"'),
  );
  const production = await (await fetch(`${base}/uk/production`)).text();
  const story = production.slice(production.indexOf('class="story-step"'));
  assert.ok(
    story.indexOf("<h2>Вирощування</h2>") <
      story.indexOf('src="/images/field-1280.webp"'),
  );
  for (const html of [
    home,
    production,
    await (await fetch(`${base}/uk/request`)).text(),
  ]) {
    assert.ok(!html.includes("lucide-arrow-up-right"));
    assert.ok(!html.includes("lucide-arrow-right"));
    assert.ok(html.includes("https://www.forestcom.org.ua/donate"));
    assert.ok(
      html.includes(
        "https://www.rainforesttrust.org/get-involved/ways-to-give/",
      ),
    );
  }
});

test("all localized internal pages expose a decorative thematic background and one H1", async () => {
  for (const locale of ["uk", "en"]) {
    for (const path of routePaths.filter(Boolean)) {
      const section = path.split("/")[1] as keyof typeof pageBackgrounds;
      const expected = pageBackgrounds[section];
      assert.ok(expected, `${path} has a section background`);
      const html = await (await fetch(`${base}/${locale}${path}`)).text();
      const visual = html.match(
        /<div class="page-heading-visual" aria-hidden="true">([\s\S]*?)<\/div>/,
      )?.[1];
      assert.ok(visual, `${locale}${path} decorative background container`);
      assert.ok(
        visual.includes(`/images/${expected}-1280.webp`),
        `${locale}${path} background`,
      );
      assert.ok(visual.includes('alt=""'), `${locale}${path} decorative image`);
      assert.ok(
        visual.includes('sizes="100vw"'),
        `${locale}${path} responsive full-width image`,
      );
      assert.equal(
        (html.match(/<h1(?:\s|>)/g) || []).length,
        1,
        `${locale}${path} H1`,
      );
    }
  }
});
