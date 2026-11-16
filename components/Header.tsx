"use client";
/* eslint-disable @next/next/no-img-element -- Original brand SVG is served directly without rasterization. */
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { type Locale } from "@/content/repository";
export default function Header({ locale }: { locale: Locale }) {
  const uk = locale === "uk";
  const path = usePathname();
  const search = useSearchParams();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const links = [
    ["about", uk ? "Холдинг" : "Holding"],
    ["production", uk ? "Виробництво" : "Production"],
    ["products", uk ? "Сировина" : "Materials"],
    ["industries", uk ? "Галузі" : "Industries"],
  ];
  const others = [
    ["sustainability", uk ? "Відповідальність" : "Responsibility"],
    ["partners", uk ? "Агропартнерам" : "For growers"],
    ["knowledge", uk ? "Матеріали та відповіді" : "Knowledge"],
    ["contacts", uk ? "Контакти" : "Contacts"],
  ];
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const opened =
          document.querySelector<HTMLDetailsElement>(".more-menu[open]");
        if (opened) {
          opened.open = false;
          opened.querySelector<HTMLElement>("summary")?.focus();
        }
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes = Array.from(
          panel.current?.querySelectorAll<HTMLElement>("a,button") || [],
        );
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  const other = locale === "uk" ? "en" : "uk";
  const languageHref =
    (path || `/${locale}`).replace(/^\/(uk|en)(?=\/|$)/, `/${other}`) +
    (search.toString() ? `?${search}` : "");
  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <Link
        href={`/${locale}`}
        className="brand"
        aria-label="GoldenWood — Home"
      >
        <img src="/logo-header.svg" alt="GoldenWood" width="132" height="88" />
      </Link>
      <nav
        className="desktop-nav"
        aria-label={uk ? "Основна навігація" : "Main navigation"}
      >
        {links.map(([slug, label]) => (
          <Link
            key={slug}
            aria-current={path?.includes("/" + slug) ? "page" : undefined}
            href={`/${locale}/${slug}`}
          >
            {label}
          </Link>
        ))}
        <details className="more-menu">
          <summary>
            {uk ? "Більше" : "More"} <ChevronDown size={12} />
          </summary>
          <div>
            {others.map(([slug, label]) => (
              <Link key={slug} href={`/${locale}/${slug}`}>
                {label}
              </Link>
            ))}
          </div>
        </details>
      </nav>
      <div className="header-actions">
        <Link className="language" href={languageHref} hrefLang={other}>
          {other.toUpperCase()} <ChevronDown size={12} />
        </Link>
        <Link className="header-cta" href={`/${locale}/request`}>
          {uk ? "Обговорити постачання" : "Discuss supply"}
          <ArrowUpRight size={16} />
        </Link>
        <button
          ref={trigger}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={uk ? "Відкрити меню" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          ref={panel}
          id="mobile-nav"
          className="mobile-nav"
          aria-label={uk ? "Мобільна навігація" : "Mobile navigation"}
        >
          <button
            onClick={() => {
              setOpen(false);
              trigger.current?.focus();
            }}
          >
            {uk ? "Закрити" : "Close"} <X />
          </button>
          {[
            ...links,
            ...others,
            ["request", uk ? "Обговорити постачання" : "Discuss supply"],
          ].map(([slug, label]) => (
            <Link
              key={slug}
              href={`/${locale}/${slug}`}
              onClick={() => setOpen(false)}
            >
              {label}
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
