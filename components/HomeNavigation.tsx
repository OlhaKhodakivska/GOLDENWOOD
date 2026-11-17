"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { type Locale } from "@/content/repository";
import { Photo } from "./ui";

const HOME_RETURN_EVENT = "goldenwood:home-return";

export function HomeLogo({
  locale,
  children,
  className,
}: {
  locale: Locale;
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const home = `/${locale}`;
  const href = `${home}#top`;
  const returnHome = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    if (pathname?.replace(/\/$/, "") !== home) return;
    event.preventDefault();
    // Repeated clicks on the current home page must also return to the top
    // and restart the photograph without moving or animating the headline.
    window.history.replaceState(window.history.state, "", href);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.getElementById("home-heading")?.focus({ preventScroll: true });
    window.dispatchEvent(new Event(HOME_RETURN_EVENT));
  };
  return (
    <Link
      href={href}
      className={className}
      onClick={returnHome}
      aria-label={
        locale === "uk"
          ? "GoldenWood — на початок головної"
          : "GoldenWood — back to the home page top"
      }
    >
      {children}
    </Link>
  );
}

export function HeroVisual({ locale }: { locale: Locale }) {
  const [playback, setPlayback] = useState(0);
  useEffect(() => {
    const replay = () => setPlayback((value) => value + 1);
    window.addEventListener(HOME_RETURN_EVENT, replay);
    return () => window.removeEventListener(HOME_RETURN_EVENT, replay);
  }, []);
  return (
    <div className="hero-visual" key={playback}>
      <Photo
        name="hero"
        alt={
          locale === "uk"
            ? "Промислові посіви технічних конопель із висоти"
            : "Aerial view of industrial hemp crops"
        }
        priority
      />
    </div>
  );
}
