import fs from "node:fs/promises";
import { products, articles } from "../content/repository.ts";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const origin = new URL(base).origin;
const paths = [
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
const cache = new Map();
const failures = [];
const links = new Map();
const external = [];
let anchorsChecked = 0;
async function page(url) {
  if (cache.has(url)) return cache.get(url);
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  const result = { status: response.status, html: await response.text() };
  cache.set(url, result);
  return result;
}
for (const locale of ["uk", "en"])
  for (const path of paths) {
    const source = `${base}/${locale}${path}`;
    const result = await page(source);
    if (result.status !== 200) failures.push({ source, status: result.status });
    for (const match of result.html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const href = match[1].replaceAll("&amp;", "&");
      const url = new URL(href, source);
      const key = url.href;
      if (!links.has(key)) links.set(key, { source, href, url });
    }
  }
for (const { source, href, url } of links.values()) {
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    failures.push({ source, href, error: "Unsupported navigation protocol" });
    continue;
  }
  if (url.origin === origin) {
    const target = new URL(url);
    target.hash = "";
    const result = await page(target.href);
    if (result.status !== 200) {
      failures.push({ source, href, status: result.status });
      continue;
    }
    if (url.hash) {
      anchorsChecked++;
      const id = decodeURIComponent(url.hash.slice(1));
      if (
        ![...result.html.matchAll(/\bid="([^"]+)"/g)].some((m) => m[1] === id)
      )
        failures.push({ source, href, error: "Missing fragment target" });
    }
  } else if (process.env.CHECK_EXTERNAL === "true") {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
      });
      external.push({
        url: url.href,
        status: response.status,
        finalUrl: response.url,
      });
      await response.body?.cancel();
      if (!response.ok)
        failures.push({ source, href, status: response.status });
    } catch (error) {
      external.push({ url: url.href, error: String(error) });
      failures.push({ source, href, error: String(error) });
    }
  }
}
const report = {
  checkedAt: new Date().toISOString(),
  base,
  pages: paths.length * 2,
  uniqueLinks: links.size,
  internalTargets: cache.size,
  anchorsChecked,
  external,
  failures,
};
await fs.mkdir("validation", { recursive: true });
await fs.writeFile(
  "validation/link-checks.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
