import { test } from "node:test";
import assert from "node:assert/strict";
import { inquirySchema } from "../lib/inquiry";
import { products, articles, productSchema } from "../content/repository";
import { POST } from "../app/api/inquiry/route";
import { webhookDelivery } from "../lib/delivery";
const valid = {
  locale: "uk",
  kind: "supply",
  company: "Test Manufacturing",
  person: "Test Buyer",
  email: "buyer@example.com",
  country: "Ukraine",
  material: "hemp-hurd",
  unit: "consultation",
  application: "Building mixture trial",
  website: "",
  consent: true,
};
const req = (body: unknown, headers: Record<string, string> = {}) =>
  new Request("http://localhost/api/inquiry", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
test("shared schema accepts consultation without exact volume or phone", () =>
  assert.equal(inquirySchema.safeParse(valid).success, true));
test("shared schema rejects invalid email, honeypot, unknown material, missing consent and oversized comment", () => {
  for (const patch of [
    { email: "bad" },
    { website: "bot" },
    { material: "unlisted" },
    { consent: false },
    { application: "" },
    { comment: "x".repeat(4001) },
  ])
    assert.equal(
      inquirySchema.safeParse({ ...valid, ...patch }).success,
      false,
    );
});
test("all products and articles have both locales and unique slugs", () => {
  assert.equal(new Set(products.map((p) => p.slug)).size, 5);
  for (const p of products) {
    assert.ok(productSchema.safeParse(p).success);
    assert.ok(p.name.uk && p.name.en && p.description.uk && p.description.en);
  }
  assert.equal(articles.length, 3);
  for (const a of articles) {
    assert.ok(a.title.uk && a.title.en);
    assert.ok(a.sections.length >= 3);
    for (const s of a.sections)
      assert.ok(s.body.uk.length > 150 && s.body.en.length > 150);
  }
});
test("API validates without delivering in demo", async () => {
  delete process.env.INQUIRY_MODE;
  const r = await POST(req(valid));
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), {
    mode: "demo",
    validated: true,
    delivered: false,
  });
});
test("API rejects invalid input and cross-origin requests", async () => {
  assert.equal((await POST(req({ ...valid, email: "invalid" }))).status, 400);
  assert.equal(
    (await POST(req(valid, { origin: "https://untrusted.example" }))).status,
    403,
  );
});
test("API enforces streamed size limits", async () => {
  const r = await POST(req({ ...valid, comment: "x".repeat(18000) }));
  assert.equal(r.status, 413);
});
test("API rejects unsupported content types", async () => {
  assert.equal(
    (await POST(req(valid, { "content-type": "text/plain" }))).status,
    415,
  );
});
test("live delivery requires distributed rate limiting and never claims success when unavailable", async () => {
  process.env.INQUIRY_MODE = "live";
  delete process.env.RATE_LIMIT_REDIS_URL;
  assert.equal((await POST(req(valid))).status, 503);
  delete process.env.INQUIRY_MODE;
});
test("provider rejects failed delivery acknowledgements", async () => {
  const oldFetch = globalThis.fetch;
  process.env.INQUIRY_WEBHOOK_URL = "https://delivery.example/inquiries";
  process.env.INQUIRY_WEBHOOK_TOKEN = "test-token";
  globalThis.fetch = async () => new Response("", { status: 500 });
  try {
    await assert.rejects(() =>
      webhookDelivery.deliver(inquirySchema.parse(valid), "test-id"),
    );
  } finally {
    globalThis.fetch = oldFetch;
    delete process.env.INQUIRY_WEBHOOK_URL;
    delete process.env.INQUIRY_WEBHOOK_TOKEN;
  }
});
test("demo limiter rejects request floods", async () => {
  let response: Response | undefined;
  for (let i = 0; i < 8; i++) response = await POST(req(valid));
  assert.equal(response?.status, 429);
});

test("same-origin browser requests work behind an internal bind address", async () => {
  const r = await POST(
    new Request("http://0.0.0.0:3000/api/inquiry", {
      method: "POST",
      headers: {
        host: "localhost:3000",
        origin: "http://localhost:3000",
        "content-type": "application/json",
      },
      body: JSON.stringify(valid),
    }),
  );
  assert.equal(r.status === 200 || r.status === 429, true);
});

test("live API only succeeds after positive provider acknowledgement", async () => {
  const previous = globalThis.fetch;
  process.env.INQUIRY_MODE = "live";
  process.env.RATE_LIMIT_REDIS_URL = "https://redis.example";
  process.env.RATE_LIMIT_REDIS_TOKEN = "test-only";
  process.env.INQUIRY_WEBHOOK_URL = "https://delivery.example/inquiry";
  process.env.INQUIRY_WEBHOOK_TOKEN = "test-only";
  let accepted = false;
  globalThis.fetch = async (input) =>
    String(input).includes("redis.example")
      ? Response.json([{ result: 1 }, { result: 1 }])
      : new Response("", { status: accepted ? 202 : 500 });
  try {
    const failed = await POST(req(valid));
    assert.equal(failed.status, 503);
    accepted = true;
    const success = await POST(req(valid));
    assert.equal(success.status, 200);
    assert.equal((await success.json()).delivered, true);
  } finally {
    globalThis.fetch = previous;
    for (const k of [
      "INQUIRY_MODE",
      "RATE_LIMIT_REDIS_URL",
      "RATE_LIMIT_REDIS_TOKEN",
      "INQUIRY_WEBHOOK_URL",
      "INQUIRY_WEBHOOK_TOKEN",
    ])
      delete process.env[k];
  }
});
