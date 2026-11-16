const local = new Map<string, { count: number; expires: number }>();
export async function allowInquiry(ip: string): Promise<boolean> {
  const hash = Array.from(
    new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip)),
    ),
  )
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
  const key = `inquiry:${Math.floor(Date.now() / 600000)}:${hash}`;
  const url = process.env.RATE_LIMIT_REDIS_URL,
    token = process.env.RATE_LIMIT_REDIS_TOKEN;
  if (url && token) {
    const res = await fetch(url + "/pipeline", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, 600],
      ]),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error("rate_limit_unavailable");
    const result = (await res.json()) as { result?: number; error?: string }[];
    if (result[0]?.error || typeof result[0]?.result !== "number")
      throw new Error("rate_limit_unavailable");
    return result[0].result <= 5;
  }
  if (process.env.INQUIRY_MODE === "live")
    throw new Error("distributed_rate_limit_required");
  for (const [k, v] of local) if (v.expires < Date.now()) local.delete(k);
  if (local.size > 5000) return false;
  const value = local.get(key) || { count: 0, expires: Date.now() + 600000 };
  value.count++;
  local.set(key, value);
  return value.count <= 5;
}
