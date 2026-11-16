import type { Inquiry } from "./inquiry";
export interface DeliveryProvider {
  deliver(inquiry: Inquiry, id: string): Promise<void>;
}
export const webhookDelivery: DeliveryProvider = {
  async deliver(inquiry, id) {
    const url = process.env.INQUIRY_WEBHOOK_URL;
    if (
      !url ||
      !url.startsWith("https://") ||
      !process.env.INQUIRY_WEBHOOK_TOKEN
    )
      throw new Error("delivery_not_configured");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.INQUIRY_WEBHOOK_TOKEN}`,
        "Idempotency-Key": id,
      },
      body: JSON.stringify({ id, inquiry }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("delivery_failed");
  },
};
