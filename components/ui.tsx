import Link from "next/link";
import { type Locale, type Product, products } from "@/content/repository";
export function Photo({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <picture className={`photo ${className}`}>
      <source
        type="image/avif"
        srcSet={`/images/${name}-640.avif 640w, /images/${name}-1280.avif 1280w, /images/${name}-1536.avif 1536w`}
        sizes="(max-width: 700px) 100vw, 70vw"
      />
      <img
        src={`/images/${name}-1280.webp`}
        alt={alt}
        width={1536}
        height={name === "hero" ? 864 : 1024}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
export function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
    </Link>
  );
}
export function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-intro">
      <span className="eyebrow">
        <i />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
export function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  return (
    <Link className="product-card" href={`/${locale}/products/${product.slug}`}>
      <div className="product-image">
        <Photo name={product.image} alt={product.name[locale]} />
      </div>
      <div className="card-label">
        {product.type === "seed"
          ? locale === "uk"
            ? "Насіння"
            : "Seed"
          : product.type === "input"
            ? locale === "uk"
              ? "Вхідна сировина"
              : "Input material"
            : product.type === "fiber"
              ? locale === "uk"
                ? "Волокниста фракція"
                : "Fiber fraction"
              : locale === "uk"
                ? "Деревинна фракція"
                : "Woody fraction"}
      </div>
      <h3>{product.name[locale]}</h3>
      <p>{product.description[locale]}</p>
    </Link>
  );
}
export function ProductSpecs({
  locale,
  product,
}: {
  locale: Locale;
  product?: Product;
}) {
  const uk = locale === "uk";
  return (
    <dl className="specs">
      {(product?.type === "seed"
        ? uk
          ? [
              ["Призначення", "Харчова переробка або посів — окремі партії"],
              [
                "Чистота, вологість та безпечність",
                "За погодженою специфікацією та протоколами",
              ],
              [
                "Сорт і схожість для посіву",
                "Підтверджуються документами посівної партії",
              ],
              [
                "Пакування",
                "Мішки або біг-беги; харчовий контакт — за призначенням",
              ],
              ["Наявність, обсяг і постачання", "Уточнюються під час запиту"],
            ]
          : [
              ["Intended use", "Food processing or sowing — separate batches"],
              [
                "Cleanliness, moisture and safety",
                "Agreed specification and test records",
              ],
              [
                "Variety and germination for sowing",
                "Verified in the sowing batch documentation",
              ],
              [
                "Packaging",
                "Bags or bulk bags; food-contact packaging where applicable",
              ],
              [
                "Availability, volume and supply",
                "Discussed during the inquiry",
              ],
            ]
        : uk
          ? [
              ["Вологість і чистота", "За специфікацією партії"],
              ["Розміри та фракція", "Погоджуються під застосування"],
              ["Обсяг і період постачання", "Уточнюються під час запиту"],
              ["Пакування", "Тюки, мішки або біг-беги — за погодженням"],
              ["Контроль", "Показники та методики погоджуються з покупцем"],
            ]
          : [
              [
                "Moisture and cleanliness",
                "According to the batch specification",
              ],
              ["Dimensions and fraction", "Agreed for the application"],
              ["Volume and delivery period", "Discussed during the inquiry"],
              ["Packaging", "Bales, bags or bulk bags, as agreed"],
              ["Testing", "Parameters and methods agreed with the buyer"],
            ]
      ).map(([a, b]) => (
        <div key={a}>
          <dt>{a}</dt>
          <dd>{b}</dd>
        </div>
      ))}
    </dl>
  );
}
export function Breadcrumbs({
  locale,
  items,
}: {
  locale: Locale;
  items: { label: string; href?: string }[];
}) {
  const entries = [
    { label: locale === "uk" ? "Головна" : "Home", href: `/${locale}` },
    ...items,
  ];
  return (
    <>
      <nav
        className="breadcrumbs"
        aria-label={locale === "uk" ? "Навігаційний шлях" : "Breadcrumb"}
      >
        {entries.map((item, i) => (
          <span key={i}>
            {i > 0 && <span className="crumb-separator">/</span>}
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: entries.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.label,
              item: item.href
                ? `${process.env.NEXT_PUBLIC_SITE_URL || "https://goldenwood.example"}${item.href}`
                : undefined,
            })),
          }),
        }}
      />
    </>
  );
}
export function CTA({ locale }: { locale: Locale }) {
  return (
    <section className="cta-section">
      <div>
        <span className="eyebrow">
          {locale === "uk" ? "НАСТУПНИЙ КРОК" : "THE NEXT STEP"}
        </span>
        <h2>
          {locale === "uk"
            ? "Ваша ідея.\nНаша сировина."
            : "Your idea.\nOur raw material."}
        </h2>
      </div>
      <div>
        <p>
          {locale === "uk"
            ? "Розкажіть про ваш виробничий процес. Разом визначимо матеріал, характеристики та формат співпраці."
            : "Tell us about your production process. Together, we can define the material, characteristics and collaboration."}
        </p>
        <Button href={`/${locale}/request`}>
          {locale === "uk" ? "Обговорити постачання" : "Discuss supply"}
        </Button>
      </div>
    </section>
  );
}
export function RelatedProducts({
  locale,
  except,
}: {
  locale: Locale;
  except?: string;
}) {
  return (
    <div className="product-grid">
      {products
        .filter((p) => p.slug !== except)
        .slice(0, 3)
        .map((p) => (
          <ProductCard key={p.slug} product={p} locale={locale} />
        ))}
    </div>
  );
}
