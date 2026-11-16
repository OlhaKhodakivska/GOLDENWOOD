/* eslint-disable @next/next/no-img-element -- Original brand SVG is served directly without rasterization. */
import Link from "next/link";
import { type Locale } from "@/content/repository";
export default function Footer({ locale }: { locale: Locale }) {
  const uk = locale === "uk";
  return (
    <footer>
      <div className="footer-main">
        <div>
          <img
            src="/logo-header.svg"
            alt="GoldenWood"
            width="150"
            height="100"
          />
          <p>
            {uk
              ? "Природний ресурс.\nПромисловий потенціал."
              : "Natural resource.\nIndustrial potential."}
          </p>
        </div>
        <div>
          <span className="eyebrow">GOLDENWOOD HOLDING</span>
          {[
            ["about", uk ? "Про холдинг" : "About us"],
            ["production", uk ? "Виробництво" : "Production"],
            ["sustainability", uk ? "Відповідальність" : "Responsibility"],
            ["partners", uk ? "Агропартнерам" : "For growers"],
          ].map(([s, t]) => (
            <Link key={s} href={`/${locale}/${s}`}>
              {t}
            </Link>
          ))}
        </div>
        <div>
          <span className="eyebrow">
            {uk ? "МАТЕРІАЛИ ТА СПІВПРАЦЯ" : "MATERIALS & PARTNERSHIP"}
          </span>
          {[
            ["products", uk ? "Каталог сировини" : "Materials catalog"],
            ["industries", uk ? "Галузі застосування" : "Applications"],
            ["knowledge", uk ? "Центр знань" : "Knowledge center"],
            ["contacts", uk ? "Контакти" : "Contacts"],
          ].map(([s, t]) => (
            <Link key={s} href={`/${locale}/${s}`}>
              {t}
            </Link>
          ))}
        </div>
        <div>
          <span className="eyebrow">
            {uk ? "ПОЧНІМО ДІАЛОГ" : "LET’S TALK"}
          </span>
          <a href="mailto:sales@goldenwood.example">
            sales@goldenwood.example ↗
          </a>
          <p>
            {uk
              ? "Україна, м. Зеленодільськ\nвул. Промислових культур, 18"
              : "18 Promyslovykh Kultur Street\nZelenodilsk, Ukraine"}
          </p>
          <small>
            {uk
              ? "Демонстраційна адреса. Телефон буде додано."
              : "Demonstration address. Phone to be added."}
          </small>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} GoldenWood Holding</span>
        <Link href={`/${locale}/privacy`}>
          {uk ? "Приватність" : "Privacy"}
        </Link>
        <Link href={`/${locale}/terms`}>
          {uk ? "Умови використання" : "Terms of use"}
        </Link>
        <span>
          {uk
            ? "Створено з повагою до природи"
            : "Created with respect for nature"}
        </span>
      </div>
      <p className="demo-note">
        {uk
          ? "Демонстраційна концепція. Контактні дані та згенеровані візуалізації наведені для презентації."
          : "Demonstration concept. Contact details and AI-generated visualizations are provided for presentation."}
      </p>
    </footer>
  );
}
