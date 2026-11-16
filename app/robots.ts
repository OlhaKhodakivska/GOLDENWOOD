export const dynamic = "force-dynamic";
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow:
        process.env.SITE_INDEXABLE === "true"
          ? ["/api/", "/uk/request", "/en/request"]
          : "/",
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://goldenwood.example"}/sitemap.xml`,
  };
}
