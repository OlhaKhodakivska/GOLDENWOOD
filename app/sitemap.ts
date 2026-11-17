export const dynamic = "force-dynamic";
import type { MetadataRoute } from "next";
import { products, articles } from "@/content/repository";
export default function sitemap(): MetadataRoute.Sitemap {
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
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://goldenwood.example";
  return ["uk", "en"].flatMap((l) =>
    paths.map((p) => ({
      url: `${base}/${l}${p}`,
      alternates: { languages: { uk: `${base}/uk${p}`, en: `${base}/en${p}` } },
    })),
  );
}
