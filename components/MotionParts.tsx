"use client";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useState } from "react";
import { type Locale } from "@/content/repository";
import { hempApplications } from "@/content/hemp";
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const eased = useSpring(scrollYProgress, { stiffness: 140, damping: 35 });
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="reading-progress"
      style={{ scaleX: reduced ? scrollYProgress : eased }}
      aria-hidden="true"
    />
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`reveal-motion ${className}`}
      initial={false}
      whileInView={reduced ? undefined : { opacity: [0.65, 1], y: [26, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
export function PossibilitiesExplorer({ locale }: { locale: Locale }) {
  const uk = locale === "uk";
  const [category, setCategory] = useState("all");
  const reduced = useReducedMotion();
  const categories = [
    ["all", uk ? "Усі можливості" : "All possibilities"],
    ["everyday", uk ? "Повсякденні речі" : "Everyday objects"],
    ["building", uk ? "Будинок та індустрія" : "Home & industry"],
    ["food", uk ? "Харчові продукти" : "Food products"],
  ];
  const items = hempApplications.filter(
    (i) => category === "all" || i.category === category,
  );
  return (
    <>
      <div
        className="possibility-tabs"
        role="group"
        aria-label={uk ? "Напрями застосування" : "Application categories"}
      >
        {categories.map(([id, label]) => (
          <button
            type="button"
            key={id}
            aria-pressed={category === id}
            onClick={() => setCategory(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {uk ? "Прикладів" : "Examples"}: {items.length}
      </p>
      <div className="possibility-grid">
        {items.map((item) => (
          <motion.article
            className="possibility-card"
            key={item.id}
            initial={false}
            animate={
              reduced ? { opacity: 1 } : { opacity: [0.65, 1], y: [10, 0] }
            }
            transition={{ duration: 0.35 }}
          >
            <h3>{item.title[locale]}</h3>
            <span className="material-path">{item.material[locale]}</span>
            <p>{item.body[locale]}</p>
          </motion.article>
        ))}
      </div>
    </>
  );
}
