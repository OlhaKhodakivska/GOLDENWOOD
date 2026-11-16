"use client";
import { usePathname } from "next/navigation";
export default function ErrorPage({ reset }: { reset: () => void }) {
  const en = usePathname()?.startsWith("/en");
  return (
    <main className="section not-found">
      <h1>
        {en
          ? "Something interrupted this page."
          : "Не вдалося завантажити сторінку."}
      </h1>
      <p>{en ? "Please try again." : "Спробуйте ще раз."}</p>
      <button className="button" onClick={reset}>
        {en ? "Try again" : "Спробувати ще раз"}
      </button>
    </main>
  );
}
