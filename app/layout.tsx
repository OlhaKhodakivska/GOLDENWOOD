import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";
import NavigationScroll from "@/components/NavigationScroll";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://goldenwood.example",
  ),
  icons: {
    icon: [
      { url: "/goldenwood-icon.svg", type: "image/svg+xml" },
      { url: "/goldenwood-icon-32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/goldenwood-icon-180.png",
  },
  robots: { index: false, follow: false },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  return (
    <html lang={h.get("x-locale") === "en" ? "en" : "uk"}>
      <body>
        {children}
        <Suspense>
          <NavigationScroll />
        </Suspense>
      </body>
    </html>
  );
}
