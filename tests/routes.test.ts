import { test } from "node:test";
import assert from "node:assert/strict";
import { products, articles } from "../content/repository";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
test("root redirects to Ukrainian", async () => {
  const r = await fetch(base, { redirect: "manual" });
  assert.ok([307, 308].includes(r.status));
  assert.equal(r.headers.get("location"), "/uk");
});
test(
  "all 40 localized routes render one H1, localized language and no indexing",
  { timeout: 120000 },
  async () => {
    const paths = [
      "",
      "/about",
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
    for (const l of ["uk", "en"])
      for (const path of paths) {
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
  assert.equal(manifest.assets.length, 11);
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
      const html = await (await fetch(`${base}/${l}`)).text();
      for (const match of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
        const href = match[1].replaceAll("&amp;", "&");
        if (href.startsWith("/")) urls.add(href.split("#")[0]);
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
