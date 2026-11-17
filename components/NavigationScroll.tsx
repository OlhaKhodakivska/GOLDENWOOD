"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function positionDestination() {
  const hash = window.location.hash.slice(1);
  if (!hash || hash === "top") {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return;
  }
  let id: string;
  try {
    id = decodeURIComponent(hash);
  } catch {
    return;
  }
  document
    .getElementById(id)
    ?.scrollIntoView({ block: "start", behavior: "instant" });
}

/** Explicit page navigation, independent of Next's first-visible-element heuristic. */
export default function NavigationScroll() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const historyTraversal = useRef(false);
  useEffect(() => {
    const onPopState = () => {
      historyTraversal.current =
        window.location.pathname !== previousPath.current;
    };
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (
        !anchor ||
        anchor.hasAttribute("download") ||
        (anchor.target && anchor.target !== "_self")
      )
        return;
      const next = new URL(anchor.href, window.location.href);
      if (
        next.origin !== window.location.origin ||
        next.hash ||
        next.pathname !== window.location.pathname ||
        next.search !== window.location.search
      )
        return;
      // A footer link to the already-open page should also return to its top.
      event.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    window.addEventListener("popstate", onPopState);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onClick, true);
    };
  }, []);
  useLayoutEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (historyTraversal.current) {
      historyTraversal.current = false;
      return;
    }
    // Reconcile after the destination DOM and Next's own focus/scroll handler commit.
    // Query-only catalog updates do not trigger this effect, preserving filter position.
    positionDestination();
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      positionDestination();
      secondFrame = requestAnimationFrame(positionDestination);
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [pathname]);
  return null;
}
