import { inquirySchema } from "@/lib/inquiry";
import { webhookDelivery } from "@/lib/delivery";
import { allowInquiry } from "@/lib/rate-limit";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const reply = (data: unknown, status = 200) =>
    Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
  const origin = request.headers.get("origin");
  if (origin) {
    let allowed = false;
    try {
      const configured = process.env.NEXT_PUBLIC_SITE_URL;
      allowed = configured
        ? new URL(origin).origin === new URL(configured).origin
        : new URL(origin).host ===
          (request.headers.get("host") || new URL(request.url).host);
    } catch {
      allowed = false;
    }
    if (!allowed) return reply({ error: "origin" }, 403);
  }
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  )
    return reply({ error: "content_type" }, 415);
  if (Number(request.headers.get("content-length") || 0) > 16384)
    return reply({ error: "too_large" }, 413);
  try {
    const ip =
      process.env.RATE_LIMIT_TRUST_CF_IP === "true"
        ? request.headers.get("cf-connecting-ip") || "shared"
        : "shared";
    if (!(await allowInquiry(ip))) return reply({ error: "rate_limit" }, 429);
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: "validation" }, 400);
    let length = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > 16384) {
        await reader.cancel();
        return reply({ error: "too_large" }, 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.length;
    }
    let input: unknown;
    try {
      input = JSON.parse(new TextDecoder().decode(bytes));
    } catch {
      return reply({ error: "invalid_json" }, 400);
    }
    const parsed = inquirySchema.safeParse(input);
    if (!parsed.success)
      return reply(
        { error: "validation", fields: parsed.error.flatten().fieldErrors },
        400,
      );
    const mode = process.env.INQUIRY_MODE || "demo";
    if (mode === "demo")
      return reply({ mode: "demo", validated: true, delivered: false });
    if (mode !== "live") return reply({ error: "configuration" }, 503);
    const id = crypto.randomUUID();
    await webhookDelivery.deliver(parsed.data, id);
    return reply({ mode: "live", delivered: true, id });
  } catch {
    return reply({ error: "delivery_unavailable" }, 503);
  }
}
