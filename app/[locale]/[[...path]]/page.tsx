import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/components/Home";
import {
  Catalog,
  Material,
  Corporate,
  Production,
  Industries,
  Knowledge,
  Article,
  RequestPage,
  Contacts,
  Legal,
} from "@/components/ContentPages";
import { repository, pages, type Locale } from "@/content/repository";
type Props = { params: Promise<{ locale: string; path?: string[] }> };
const names: Record<string, [string, string]> = {
  about: ["Холдинг", "Holding"],
  production: ["Виробництво", "Production"],
  products: ["Сировина", "Materials"],
  industries: ["Галузі застосування", "Applications"],
  sustainability: ["Відповідальне виробництво", "Responsible production"],
  partners: ["Агропартнерство", "Grower partnership"],
  knowledge: ["Центр знань", "Knowledge center"],
  contacts: ["Контакти", "Contacts"],
  request: ["Запит на постачання", "Supply inquiry"],
  privacy: ["Політика приватності", "Privacy policy"],
  terms: ["Умови використання", "Terms of use"],
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, path = [] } = await params;
  const l = locale === "en" ? "en" : "uk";
  const uk = l === "uk";
  const slug = path.join("/");
  let title = path.length
    ? names[path[0]]?.[uk ? 0 : 1] || "404"
    : uk
      ? "Рослинна сировина для промисловості"
      : "Plant-based materials for industry";
  let description = uk
    ? "Технічні коноплі, первинна переробка та оптове постачання волокна й костриці. Каталог матеріалів та B2B-запит."
    : "Industrial hemp, primary processing and wholesale fiber and hurd supply. Material catalog and B2B inquiries.";
  const descriptions: Record<string, [string, string]> = {
    production: [
      "Шість етапів від вирощування технічних конопель до декортикації, сортування та підготовки партії до постачання.",
      "Six stages from industrial hemp cultivation to decortication, sorting and preparation of a supply batch.",
    ],
    products: [
      "Каталог: декортиковане й коротке волокно, костриця, подрібнена костриця та конопляна треста. Пошук за матеріалом і галуззю.",
      "Explore decorticated and short fiber, hemp hurd, crushed hurd and retted stalks. Filter by material and application.",
    ],
    industries: [
      "Рослинна сировина для будівельних матеріалів, біокомпозитів, паперу, нетканих структур та інших виробничих процесів.",
      "Plant raw materials for building products, biocomposites, paper, nonwoven structures and other manufacturing processes.",
    ],
    knowledge: [
      "Три практичні статті про волокно, кострицю, підготовку запиту й етапи первинної механічної переробки.",
      "Three practical articles about fiber, hurd, preparing a supply inquiry and primary mechanical processing.",
    ],
    contacts: [
      "Демонстраційні контакти GoldenWood Holding: постачання, агропартнерство та форма запиту. Адреса й пошта наведені для презентації.",
      "Demonstration contacts for GoldenWood Holding: supply, grower partnerships and inquiry form. Address and email are presentation details.",
    ],
    request: [
      "Сформуйте B2B-запит на сировину, зразки, технічну консультацію чи агропартнерство. Точний обсяг не обов’язковий.",
      "Create a B2B inquiry for raw materials, samples, technical consultation or grower partnership. An exact volume is optional.",
    ],
    privacy: [
      "Проєкт політики приватності демонстраційного сайту GoldenWood: дані форми, demo/live-режими та вимоги перед запуском.",
      "Draft privacy policy for the GoldenWood demonstration site: inquiry data, demo/live modes and requirements before launch.",
    ],
    terms: [
      "Проєкт умов використання GoldenWood: демонстраційний статус, погодження специфікацій та оцінка придатності матеріалів.",
      "Draft GoldenWood terms of use: demonstration status, specification agreements and material suitability assessment.",
    ],
  };
  if (path.length === 1) {
    if (pages[path[0]]) description = pages[path[0]].intro[l];
    else if (descriptions[path[0]])
      description = descriptions[path[0]][uk ? 0 : 1];
  }
  if (path[0] === "products" && path[1]) {
    const p = repository.getProduct(path[1]);
    if (p) {
      title = p.name[l];
      description = p.description[l];
    }
  }
  if (path[0] === "knowledge" && path[1]) {
    const a = repository.getArticle(path[1]);
    if (a) {
      title = a.title[l];
      description = a.sections[0].body[l].slice(0, 180);
    }
  }
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://goldenwood.example";
  return {
    title: `${title} | GoldenWood`,
    description,
    alternates: {
      canonical: `${base}/${l}${slug ? "/" + slug : ""}`,
      languages: {
        uk: `${base}/uk${slug ? "/" + slug : ""}`,
        en: `${base}/en${slug ? "/" + slug : ""}`,
      },
    },
    openGraph: {
      title: `${title} | GoldenWood`,
      description,
      locale: uk ? "uk_UA" : "en_GB",
      type: path[0] === "knowledge" && path[1] ? "article" : "website",
      images: [`${base}/images/hero-1280.webp`],
    },
    robots:
      process.env.SITE_INDEXABLE === "true"
        ? { index: true, follow: true }
        : { index: false, follow: false },
  };
}
export default async function Page({ params }: Props) {
  const { locale, path = [] } = await params;
  if (locale !== "uk" && locale !== "en") notFound();
  const l = locale as Locale;
  let content: React.ReactNode;
  if (path.length === 0) content = <Home locale={l} />;
  else if (path.length === 1) {
    const key = path[0];
    if (key === "products") content = <Catalog locale={l} />;
    else if (key === "production") content = <Production locale={l} />;
    else if (key === "industries") content = <Industries locale={l} />;
    else if (key === "knowledge") content = <Knowledge locale={l} />;
    else if (key === "request") content = <RequestPage locale={l} />;
    else if (key === "contacts") content = <Contacts locale={l} />;
    else if (key === "privacy" || key === "terms")
      content = <Legal locale={l} kind={key} />;
    else if (pages[key]) content = <Corporate locale={l} slug={key} />;
    else notFound();
  } else if (
    path.length === 2 &&
    path[0] === "products" &&
    repository.getProduct(path[1])
  )
    content = <Material locale={l} slug={path[1]} />;
  else if (
    path.length === 2 &&
    path[0] === "knowledge" &&
    repository.getArticle(path[1])
  )
    content = <Article locale={l} slug={path[1]} />;
  else notFound();
  return (
    <>
      <a className="skip-link" href="#main">
        {l === "uk" ? "Перейти до вмісту" : "Skip to content"}
      </a>
      <Suspense>
        <Header locale={l} />
      </Suspense>
      <main id="main">
        <Suspense>{content}</Suspense>
      </main>
      <Footer locale={l} />
    </>
  );
}
