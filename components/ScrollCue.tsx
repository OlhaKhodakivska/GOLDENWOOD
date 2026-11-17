import { ChevronDown } from "./icons";
import type { Locale } from "@/content/repository";

/** Native anchor: mouse-wheel hint on desktop, chevron on touch-sized screens. */
export default function ScrollCue({
  locale,
  target,
  label,
}: {
  locale: Locale;
  target: string;
  label?: string;
}) {
  const description =
    label ||
    (locale === "uk"
      ? "Прокрутити до вмісту сторінки"
      : "Scroll to page content");
  return (
    <a
      className="page-scroll-cue"
      href={`#${target}`}
      aria-label={description}
      title={description}
    >
      <span className="scroll-cue-mouse" aria-hidden="true">
        <span />
      </span>
      <ChevronDown
        className="scroll-cue-chevron"
        size={18}
        strokeWidth={1.8}
        aria-hidden="true"
      />
    </a>
  );
}
