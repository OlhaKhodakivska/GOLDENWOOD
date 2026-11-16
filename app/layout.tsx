import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://goldenwood.example",
  ),
  icons: { icon: "/logo-header.svg" },
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
      <body>{children}</body>
    </html>
  );
}
