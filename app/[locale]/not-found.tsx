import { headers } from "next/headers";
import { NotFoundContent } from "@/components/ContentPages";
export default async function NotFound() {
  const h = await headers();
  return <NotFoundContent locale={h.get("x-locale") === "en" ? "en" : "uk"} />;
}
