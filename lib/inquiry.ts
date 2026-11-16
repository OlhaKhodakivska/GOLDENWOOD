import { z } from "zod";
import { products } from "@/content/repository";
const short = z.string().trim().max(250);
export const inquirySchema = z.object({
  locale: z.enum(["uk", "en"]),
  kind: z.enum(["supply", "samples", "grower", "general"]),
  company: short.min(2),
  person: short.min(2),
  email: z.string().trim().email().max(254),
  phone: z.string().max(50).optional(),
  country: short.min(2),
  material: z.enum(["consultation", ...products.map((p) => p.slug)] as [
    string,
    ...string[],
  ]),
  volume: z.string().max(100).optional(),
  unit: z.enum(["tonnes", "kg", "consultation"]),
  application: z.string().trim().min(3).max(2000),
  period: short.optional(),
  comment: z.string().max(4000).optional(),
  website: z.string().max(0),
  consent: z.literal(true),
});
export type Inquiry = z.infer<typeof inquirySchema>;
