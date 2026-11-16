"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ArrowUpRight, Plus, Minus, Search, ArrowRight } from "lucide-react";
import {
  type Locale,
  stages,
  faq,
  products,
  industries,
} from "@/content/repository";
import { Photo, ProductCard } from "./ui";
export function ProcessExplorer({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  return (
    <div className="process-explorer">
      <div
        className="process-tabs"
        role="tablist"
        aria-label={locale === "uk" ? "Етапи виробництва" : "Production stages"}
      >
        {stages.map((s, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            id={`stage-tab-${i}`}
            aria-controls="stage-panel"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onKeyDown={(e) => {
              if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? stages.length - 1
                      : (active +
                          (e.key === "ArrowRight" ? 1 : stages.length - 1)) %
                        stages.length;
                setActive(next);
                document.getElementById(`stage-tab-${next}`)?.focus();
              }
            }}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {s.name[locale]}
            <ArrowUpRight size={18} />
          </button>
        ))}
      </div>
      <motion.div
        key={active}
        initial={false}
        animate={reduced ? { opacity: 1 } : { opacity: [0.65, 1], y: [8, 0] }}
        transition={{ duration: 0.3 }}
        className="process-panel"
        id="stage-panel"
        role="tabpanel"
        aria-labelledby={`stage-tab-${active}`}
        tabIndex={0}
      >
        <Photo name={stages[active].image} alt={stages[active].name[locale]} />
        <div>
          <span className="eyebrow">0{active + 1} / 06</span>
          <h3>{stages[active].name[locale]}</h3>
          <p>{stages[active].description[locale]}</p>
        </div>
      </motion.div>
    </div>
  );
}
export function FAQAccordion({ locale }: { locale: Locale }) {
  return (
    <div className="faq-list">
      {faq.map((f, i) => (
        <details key={i}>
          <summary>
            <span className="faq-num">0{i + 1}</span>
            {f.q[locale]}
            <Plus size={20} className="plus" />
            <Minus size={20} className="minus" />
          </summary>
          <p>{f.a[locale]}</p>
        </details>
      ))}
    </div>
  );
}
export function ProductFilters({ locale }: { locale: Locale }) {
  const params = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const uk = locale === "uk";
  const query = params.get("q") || "";
  const type = params.get("type") || "";
  const application = params.get("application") || "";
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${path}${next.size ? "?" + next.toString() : ""}`, {
      scroll: false,
    });
  };
  const filtered = products.filter(
    (p) =>
      (!type || p.type === type) &&
      (!application || p.applications.includes(application)) &&
      (!query ||
        `${p.name[locale]} ${p.description[locale]}`
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())),
  );
  return (
    <>
      <div className="filters">
        <label className="search-field">
          <Search size={19} />
          <span className="sr-only">
            {uk ? "Пошук матеріалу" : "Search materials"}
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => update("q", e.target.value)}
            placeholder={uk ? "Знайти матеріал…" : "Find a material…"}
          />
        </label>
        <label>
          <span>{uk ? "Тип матеріалу" : "Material type"}</span>
          <select value={type} onChange={(e) => update("type", e.target.value)}>
            <option value="">{uk ? "Усі типи" : "All types"}</option>
            <option value="fiber">{uk ? "Волокно" : "Fiber"}</option>
            <option value="hurd">{uk ? "Костриця" : "Hurd"}</option>
            <option value="input">
              {uk ? "Вхідна сировина" : "Input material"}
            </option>
          </select>
        </label>
        <label>
          <span>{uk ? "Застосування" : "Application"}</span>
          <select
            value={application}
            onChange={(e) => update("application", e.target.value)}
          >
            <option value="">{uk ? "Усі галузі" : "All industries"}</option>
            {industries.map((i) => (
              <option key={i.slug} value={i.slug}>
                {i.name[locale]}
              </option>
            ))}
          </select>
        </label>
        <button
          className="text-link"
          onClick={() => router.replace(path, { scroll: false })}
        >
          {uk ? "Скинути" : "Reset"} <ArrowRight size={16} />
        </button>
      </div>
      <p className="result-count" aria-live="polite">
        {uk ? "Знайдено матеріалів" : "Materials found"}: {filtered.length}
      </p>
      {filtered.length ? (
        <div className="product-grid catalog-grid">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>{uk ? "Матеріалів не знайдено" : "No matching materials"}</h2>
          <p>
            {uk
              ? "Змініть запит або скиньте фільтри."
              : "Try a different search or reset the filters."}
          </p>
          <button
            className="button"
            onClick={() => router.replace(path, { scroll: false })}
          >
            {uk ? "Скинути фільтри" : "Reset filters"}
          </button>
        </div>
      )}
    </>
  );
}
