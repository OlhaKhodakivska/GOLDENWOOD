import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "./icons";
import {
  type Locale,
  repository,
  industries,
  pages,
  stages,
  articles,
} from "@/content/repository";
import {
  Photo,
  Button,
  SectionIntro,
  Breadcrumbs,
  ProductSpecs,
  RelatedProducts,
  CTA,
} from "./ui";
import { ProductFilters, FAQAccordion } from "./Interactive";
import InquiryForm from "./InquiryForm";
export function PageHeading({
  locale,
  title,
  intro,
  eyebrow,
}: {
  locale: Locale;
  title: string;
  intro?: string;
  eyebrow?: string;
}) {
  return (
    <div className="page-heading">
      <Breadcrumbs locale={locale} items={[{ label: eyebrow || title }]} />
      {eyebrow && (
        <span className="eyebrow">
          <i />
          {eyebrow}
        </span>
      )}
      <h1>{title}</h1>
      {intro && <p>{intro}</p>}
    </div>
  );
}
export function Catalog({ locale }: { locale: Locale }) {
  const uk = locale === "uk";
  return (
    <>
      <PageHeading
        locale={locale}
        eyebrow={uk ? "КАТАЛОГ СИРОВИНИ" : "MATERIAL CATALOG"}
        title={
          uk
            ? "Матеріали з природним\nпотенціалом."
            : "Materials with\nnatural potential."
        }
        intro={
          uk
            ? "Вхідна стеблова сировина, волокнисті та деревинні фракції. Знайдіть основу для вашого виробництва."
            : "Input stalk materials, fibrous and woody fractions. Find a foundation for your manufacturing process."
        }
      />
      <section className="section catalog-section">
        <ProductFilters locale={locale} />
      </section>
      <CTA locale={locale} />
    </>
  );
}
export function Material({ locale, slug }: { locale: Locale; slug: string }) {
  const p = repository.getProduct(slug)!;
  const uk = locale === "uk";
  return (
    <>
      <div className="section product-detail">
        <Breadcrumbs
          locale={locale}
          items={[
            {
              label: uk ? "Сировина" : "Materials",
              href: `/${locale}/products`,
            },
            { label: p.name[locale] },
          ]}
        />
        <div className="product-detail-grid">
          <Photo name={p.image} alt={p.name[locale]} priority />
          <div>
            <span className="eyebrow">
              {uk ? "МАТЕРІАЛИ GOLDENWOOD" : "GOLDENWOOD MATERIALS"}
            </span>
            <h1>{p.name[locale]}</h1>
            <p>{p.description[locale]}</p>
            <div className="tag-list">
              {p.applications.map((a) => (
                <Link key={a} href={`/${locale}/industries#${a}`}>
                  {industries.find((i) => i.slug === a)?.name[locale]}
                </Link>
              ))}
            </div>
            <Button href={`/${locale}/request?material=${p.slug}`}>
              {uk ? "Запитати пропозицію" : "Request an offer"}
            </Button>
            <Link
              className="text-link"
              href={`/${locale}/request?material=${p.slug}&type=samples`}
            >
              {uk
                ? "Запитати зразки та специфікацію"
                : "Request samples & specification"}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
      <section className="section spec-section">
        <SectionIntro
          eyebrow={uk ? "ПІД ВАШЕ ЗАСТОСУВАННЯ" : "FOR YOUR APPLICATION"}
          title={
            uk
              ? "Характеристики,\nякі мають значення."
              : "Characteristics\nthat matter."
          }
          description={
            uk
              ? "Точні значення встановлюються для конкретної партії та перевіряються за погодженою методикою."
              : "Exact values are established for the specific batch and assessed using an agreed method."
          }
        />
        <ProductSpecs locale={locale} />
      </section>
      <section className="section split-section">
        <div>
          <SectionIntro
            eyebrow={uk ? "ПОХОДЖЕННЯ МАТЕРІАЛУ" : "MATERIAL ORIGIN"}
            title={stages[p.stage].name[locale]}
            description={stages[p.stage].description[locale]}
          />
          <Link className="text-link" href={`/${locale}/production`}>
            {uk ? "Увесь виробничий ланцюг" : "The complete production chain"}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <Photo
          name={stages[p.stage].image}
          alt={stages[p.stage].name[locale]}
        />
      </section>
      <section className="section sample-section">
        <h2>
          {uk
            ? "Спочатку — зразок і технічний діалог."
            : "Start with a sample and a technical discussion."}
        </h2>
        <p>
          {uk
            ? "Вкажіть застосування, відомі технічні вимоги й формат випробувань. Доступність зразка, його обсяг, пакування та доставка погоджуються під час запиту. Придатність матеріалу визначайте на основі випробувань; універсальна взаємозамінність не передбачається."
            : "State your application, known technical requirements and test format. Sample availability, volume, packaging and delivery are discussed during the inquiry. Determine suitability through testing; universal interchangeability is not assumed."}
        </p>
        <Button href={`/${locale}/request?material=${p.slug}&type=samples`}>
          {uk ? "Обговорити зразок" : "Discuss a sample"}
        </Button>
      </section>
      <section className="section">
        <SectionIntro
          eyebrow={uk ? "ПОВ’ЯЗАНІ МАТЕРІАЛИ" : "RELATED MATERIALS"}
          title={
            uk
              ? "Інші фракції. Нові задачі."
              : "Other fractions. New applications."
          }
        />
        <RelatedProducts locale={locale} except={p.slug} />
      </section>
      <CTA locale={locale} />
    </>
  );
}
export function Corporate({ locale, slug }: { locale: Locale; slug: string }) {
  const p = pages[slug];
  const uk = locale === "uk";
  return (
    <>
      <PageHeading
        locale={locale}
        title={p.title[locale]}
        intro={p.intro[locale]}
        eyebrow={
          slug === "about"
            ? uk
              ? "ПРО ХОЛДИНГ"
              : "ABOUT THE HOLDING"
            : slug === "partners"
              ? uk
                ? "АГРОПАРТНЕРСТВО"
                : "GROWER PARTNERSHIP"
              : uk
                ? "ВІДПОВІДАЛЬНІСТЬ"
                : "RESPONSIBILITY"
        }
      />
      <div className="wide-photo">
        <Photo name={p.image} alt={p.title[locale]} priority />
      </div>
      <div className="section editorial-sections">
        {p.sections.map((s, i) => (
          <section key={i}>
            <span className="eyebrow">0{i + 1}</span>
            <h2>{s.title[locale]}</h2>
            <p>{s.body[locale]}</p>
          </section>
        ))}
      </div>
      {slug === "partners" && (
        <section className="section sample-section">
          <h2>
            {uk
              ? "Розкажіть про ваше господарство."
              : "Tell us about your farm."}
          </h2>
          <p>
            {uk
              ? "Регіон, досвід, техніка й очікування — достатньо для початку розмови."
              : "Region, experience, equipment and expectations are enough to start a conversation."}
          </p>
          <Button href={`/${locale}/request?type=grower`}>
            {uk ? "Запит щодо вирощування" : "Grower inquiry"}
          </Button>
        </section>
      )}
      <CTA locale={locale} />
    </>
  );
}
export function Production({ locale }: { locale: Locale }) {
  const uk = locale === "uk";
  return (
    <>
      <PageHeading
        locale={locale}
        eyebrow={uk ? "ВИРОЩУВАННЯ ТА ПЕРЕРОБКА" : "CULTIVATION & PROCESSING"}
        title={
          uk
            ? "Від землі —\nдо вашого виробництва."
            : "From the land —\nto your production."
        }
        intro={
          uk
            ? "Пов’язуємо агрономічні рішення, механічну переробку й підготовку партії в єдиний шлях матеріалу."
            : "Connecting agronomic decisions, mechanical processing and batch preparation into a single material journey."
        }
      />
      <div className="production-story section">
        <aside>
          <span className="eyebrow">
            {uk ? "ВИРОБНИЧИЙ ШЛЯХ" : "THE PRODUCTION JOURNEY"}
          </span>
          <h2>{uk ? "Кожен етап\nмає значення." : "Every stage\nmatters."}</h2>
          <p>
            {uk
              ? "Земля → технологія → матеріал → промисловість."
              : "Land → technology → material → industry."}
          </p>
        </aside>
        <div>
          {stages.map((s, i) => (
            <section className="story-step" key={i}>
              <Photo name={s.image} alt={s.name[locale]} />
              <span className="eyebrow">0{i + 1} / 06</span>
              <h2>{s.name[locale]}</h2>
              <p>{s.description[locale]}</p>
            </section>
          ))}
        </div>
      </div>
      <section className="section sample-section">
        <h2>
          {uk
            ? "Простежуваність — частина процесу."
            : "Traceability is part of the process."}
        </h2>
        <p>
          {uk
            ? "Ідентифікатор пов’язує вхідну сировину, отримані фракції, оцінку характеристик і відвантаження. Перелік параметрів та документи погоджуються з покупцем. Зображення на цій сторінці — згенеровані концептуальні ілюстрації."
            : "A batch identifier connects input material, resulting fractions, assessment and dispatch. Parameters and documents are agreed with the buyer. Images on this page are AI-generated conceptual illustrations."}
        </p>
      </section>
      <CTA locale={locale} />
    </>
  );
}
export function Industries({ locale }: { locale: Locale }) {
  const uk = locale === "uk";
  return (
    <>
      <PageHeading
        locale={locale}
        eyebrow={uk ? "ГАЛУЗІ ЗАСТОСУВАННЯ" : "INDUSTRIAL APPLICATIONS"}
        title={
          uk
            ? "Рослинна основа.\nПромислова перспектива."
            : "A plant-based foundation.\nAn industrial perspective."
        }
        intro={
          uk
            ? "Підбирайте матеріал під процес. Придатність конкретної партії визначається характеристиками, випробуваннями та вимогами покупця."
            : "Select a material for your process. Suitability of a specific batch depends on characteristics, testing and buyer requirements."
        }
      />
      <section className="section industry-cards">
        {industries.map((i, n) => (
          <article id={i.slug} key={i.slug}>
            <span className="eyebrow">0{n + 1}</span>
            <h2>{i.name[locale]}</h2>
            <p>{i.description[locale]}</p>
            <Link
              className="text-link"
              href={`/${locale}/products?application=${i.slug}`}
            >
              {uk ? "Відповідні матеріали" : "Relevant materials"}
              <ArrowUpRight size={20} />
            </Link>
          </article>
        ))}
      </section>
      <CTA locale={locale} />
    </>
  );
}
export function Knowledge({ locale }: { locale: Locale }) {
  const uk = locale === "uk";
  return (
    <>
      <PageHeading
        locale={locale}
        eyebrow={uk ? "ЦЕНТР ЗНАНЬ" : "KNOWLEDGE CENTER"}
        title={
          uk
            ? "Знання для\nобґрунтованих рішень."
            : "Knowledge for\ninformed decisions."
        }
        intro={
          uk
            ? "Про сировину, первинну переробку та підготовку до промислової співпраці."
            : "About raw materials, primary processing and preparation for industrial collaboration."
        }
      />
      <section className="section article-grid">
        {articles.map((a) => (
          <Link
            className="article-card"
            key={a.slug}
            href={`/${locale}/knowledge/${a.slug}`}
          >
            <Photo name={a.image} alt={a.title[locale]} />
            <span className="card-label">{a.tag[locale]}</span>
            <h2>{a.title[locale]}</h2>
            <span className="text-link">
              {uk ? "Читати статтю" : "Read article"}
              <ArrowUpRight size={18} />
            </span>
          </Link>
        ))}
      </section>
      <section className="section faq-section">
        <SectionIntro
          eyebrow="FAQ"
          title={
            uk ? "Відповіді на ваші питання." : "Answers to your questions."
          }
        />
        <FAQAccordion locale={locale} />
      </section>
      <CTA locale={locale} />
    </>
  );
}
export function Article({ locale, slug }: { locale: Locale; slug: string }) {
  const a = repository.getArticle(slug)!;
  const uk = locale === "uk";
  return (
    <>
      <article className="article-detail">
        <Breadcrumbs
          locale={locale}
          items={[
            {
              label: uk ? "Центр знань" : "Knowledge center",
              href: `/${locale}/knowledge`,
            },
            { label: a.title[locale] },
          ]}
        />
        <span className="eyebrow">
          {a.tag[locale]} · {uk ? "5 хв читання" : "5 min read"}
        </span>
        <h1>{a.title[locale]}</h1>
        <Photo name={a.image} alt={a.title[locale]} priority />
        <div className="article-prose">
          {a.sections.map((s, i) => (
            <section key={i}>
              <h2>{s.title[locale]}</h2>
              <p>{s.body[locale]}</p>
            </section>
          ))}
          <Link className="text-link" href={`/${locale}/request`}>
            {uk ? "Обговорити ваш процес" : "Discuss your process"}
            <ArrowRight size={18} />
          </Link>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: a.title[locale],
              inLanguage: locale,
              author: { "@type": "Organization", name: "GoldenWood Holding" },
              image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://goldenwood.example"}/images/${a.image}-1280.webp`,
            }),
          }}
        />
      </article>
      <CTA locale={locale} />
    </>
  );
}
export function RequestPage({ locale }: { locale: Locale }) {
  const uk = locale === "uk";
  return (
    <>
      <PageHeading
        locale={locale}
        eyebrow={uk ? "ПОЧНІМО СПІВПРАЦЮ" : "LET’S START A PARTNERSHIP"}
        title={
          uk
            ? "Ваш запит —\nпочаток діалогу."
            : "Your inquiry is\nthe start of a conversation."
        }
        intro={
          uk
            ? "Розкажіть про матеріал, застосування та очікування. Якщо деталі ще не визначені — оберіть консультацію."
            : "Tell us about the material, application and expectations. If the details are still open, select consultation."
        }
      />
      <section className="section request-layout">
        <aside>
          <span className="eyebrow">
            {uk ? "ЯК ЦЕ ПРАЦЮЄ" : "HOW IT WORKS"}
          </span>
          {(uk
            ? [
                "Ви описуєте задачу",
                "Узгоджуємо характеристики",
                "Обговорюємо зразки й постачання",
              ]
            : [
                "You describe your needs",
                "We discuss specifications",
                "We agree samples and supply",
              ]
          ).map((s, i) => (
            <div className="request-step" key={s}>
              <span>0{i + 1}</span>
              <h3>{s}</h3>
            </div>
          ))}
          <p>
            {uk
              ? "Обсяг може бути орієнтовним. Телефон не є обов’язковим."
              : "Volume can be approximate. A phone number is optional."}
          </p>
        </aside>
        <InquiryForm key={locale} locale={locale} />
      </section>
    </>
  );
}
export function Contacts({ locale }: { locale: Locale }) {
  const uk = locale === "uk";
  return (
    <>
      <PageHeading
        locale={locale}
        eyebrow={uk ? "КОНТАКТИ" : "CONTACTS"}
        title={
          uk ? "Прямий шлях\nдо співпраці." : "A direct path\nto partnership."
        }
        intro={
          uk
            ? "Оберіть напрям звернення або сформуйте змістовний запит через форму."
            : "Choose an inquiry type or describe your needs in the form."
        }
      />
      <section className="section contact-layout">
        <div>
          <h2>GoldenWood Holding</h2>
          <p>
            {uk
              ? "Україна, м. Зеленодільськ,\nвул. Промислових культур, 18"
              : "18 Promyslovykh Kultur Street,\nZelenodilsk, Ukraine"}
          </p>
          <small>
            {uk
              ? "Вигадана демонстраційна адреса."
              : "Fictional demonstration address."}
          </small>
          <dl className="specs">
            <div>
              <dt>{uk ? "Постачання" : "Supply"}</dt>
              <dd>
                <a href="mailto:sales@goldenwood.example">
                  sales@goldenwood.example
                </a>
              </dd>
            </div>
            <div>
              <dt>{uk ? "Агропартнерство" : "Grower partnership"}</dt>
              <dd>
                <a href="mailto:partners@goldenwood.example">
                  partners@goldenwood.example
                </a>
              </dd>
            </div>
            <div>
              <dt>{uk ? "Телефон" : "Phone"}</dt>
              <dd>{uk ? "Буде додано" : "To be added"}</dd>
            </div>
          </dl>
          <p>
            {uk
              ? "Адреси .example не приймають листів. У demo-режимі форма лише перевіряє дані."
              : "The .example addresses do not receive emails. In demo mode, the form only validates data."}
          </p>
          <Button href={`/${locale}/request`}>
            {uk ? "Сформувати запит" : "Create an inquiry"}
          </Button>
        </div>
        <div className="logistics">
          <span className="eyebrow">
            {uk ? "ЛОГІКА ПОСТАЧАННЯ" : "SUPPLY LOGIC"}
          </span>
          {(uk
            ? ["Поле", "Переробка", "Склад", "Ваше виробництво"]
            : ["Field", "Processing", "Warehouse", "Your production"]
          ).map((s, i) => (
            <div key={s}>
              <span>0{i + 1}</span>
              <h3>{s}</h3>
              {i < 3 && <ArrowDownIcon />}
            </div>
          ))}
          <small>
            {uk
              ? "Схема процесу, не географічна карта."
              : "Process diagram, not a geographical map."}
          </small>
        </div>
      </section>
    </>
  );
}
function ArrowDownIcon() {
  return <span className="logistics-arrow">↓</span>;
}
export function Legal({
  locale,
  kind,
}: {
  locale: Locale;
  kind: "privacy" | "terms";
}) {
  const uk = locale === "uk";
  const privacy = kind === "privacy";
  return (
    <>
      <PageHeading
        locale={locale}
        eyebrow={uk ? "ПРОЄКТ ДОКУМЕНТА" : "DOCUMENT DRAFT"}
        title={
          privacy
            ? uk
              ? "Політика приватності"
              : "Privacy policy"
            : uk
              ? "Умови використання"
              : "Terms of use"
        }
        intro={
          uk
            ? "Демонстраційний проєкт тексту. Перед реальним запуском потрібні фактичні дані оператора та юридична перевірка."
            : "Demonstration draft. Actual operator information and legal review are required before launch."
        }
      />
      <article className="legal-prose section">
        {(privacy
          ? uk
            ? [
                [
                  "Статус сайту",
                  "Сайт є демонстраційною концепцією GoldenWood Holding. Вказані адреси та контактні дані вигадані. Оператор даних, його реквізити та контакт для звернень щодо приватності мають бути визначені перед запуском.",
                ],
                [
                  "Дані форми та мета",
                  "Форма обробляє назву компанії, ім’я, email, необов’язковий телефон, країну та відомості про запит для його перевірки й обговорення постачання. Не включайте чутливі або зайві персональні дані.",
                ],
                [
                  "Demo та live",
                  "У demo-режимі дані передаються на сервер для валідації та не надсилаються сервісу доставки. У live-режимі дані передаються налаштованому сервісу лише після валідації. Умови обробки цим сервісом, місце зберігання, строки видалення та правова підстава повинні бути визначені оператором до запуску.",
                ],
                [
                  "Технічні дані",
                  "Захист від надмірних звернень використовує тимчасовий хеш IP-адреси та лічильник із терміном дії до 10 хвилин. Хостинг може обробляти технічні журнали за власними правилами. Стороння аналітика й маркетингові cookies не підключені.",
                ],
                [
                  "Ваші звернення",
                  "Порядок доступу, виправлення та видалення даних, відкликання згоди, строки зберігання й дані відповідального оператора необхідно доповнити перед реальним запуском. У демонстраційного сайту немає чинної поштової скриньки для таких звернень.",
                ],
              ]
            : [
                [
                  "Website status",
                  "This website is a demonstration concept for GoldenWood Holding. Addresses and contact details are fictional. The data controller, legal details and privacy contact must be established before launch.",
                ],
                [
                  "Form data and purpose",
                  "The form processes company, name, email, optional phone, country and inquiry information to validate requests and discuss supply. Do not include sensitive or unnecessary personal data.",
                ],
                [
                  "Demo and live",
                  "In demo mode, data is sent to the server for validation and is not sent to a delivery service. In live mode, validated data is sent to the configured service. Processing terms, storage location, retention and legal basis must be defined by the controller before launch.",
                ],
                [
                  "Technical data",
                  "Abuse prevention uses a temporary IP hash and a counter expiring within 10 minutes. Hosting may process technical logs under its own policies. No third-party analytics or marketing cookies are connected.",
                ],
                [
                  "Your requests",
                  "Access, correction, deletion, withdrawal procedures, retention periods and actual controller contact information must be completed before launch. The demonstration site has no working privacy mailbox.",
                ],
              ]
          : uk
            ? [
                [
                  "Демонстраційний характер",
                  "Матеріали сайту представляють концепцію бізнесу, а не підтвердження наявних виробничих активів або публічну оферту. Фотографії згенеровані.",
                ],
                [
                  "Продукція та співпраця",
                  "Наявність, характеристики, обсяг, пакування, ціна й період постачання потребують окремого погодження. Каталог не є інтернет-магазином. Запит через форму не створює зобов’язання постачання.",
                ],
                [
                  "Перевірка придатності",
                  "Покупець має оцінити придатність матеріалу для власного процесу на підставі погоджених характеристик та випробувань. Універсальна взаємозамінність матеріалів не гарантується.",
                ],
                [
                  "Перед запуском",
                  "Потрібно визначити власника контенту, фактичного оператора, застосовне право, порядок вирішення спорів та реальні контакти. Цей текст потребує перевірки фахівцем.",
                ],
              ]
            : [
                [
                  "Demonstration status",
                  "Website materials present a business concept, rather than evidence of production assets or a binding offer. Photographs are AI-generated.",
                ],
                [
                  "Products and collaboration",
                  "Availability, characteristics, volume, packaging, price and delivery period require separate agreement. This catalog is not an online store. A form inquiry does not create a supply commitment.",
                ],
                [
                  "Suitability assessment",
                  "Buyers should assess material suitability for their processes using agreed specifications and testing. Universal material interchangeability is not guaranteed.",
                ],
                [
                  "Before launch",
                  "Content ownership, actual operator, applicable law, dispute procedures and real contact details must be established. This text requires professional review.",
                ],
              ]
        ).map(([t, b]) => (
          <section key={t}>
            <h2>{t}</h2>
            <p>{b}</p>
          </section>
        ))}
      </article>
    </>
  );
}
export function NotFoundContent({ locale }: { locale: Locale }) {
  return (
    <section className="section not-found">
      <span className="eyebrow">404</span>
      <h1>
        {locale === "uk"
          ? "Цей шлях ще не прокладено."
          : "This path has not been mapped yet."}
      </h1>
      <p>
        {locale === "uk"
          ? "Перевірте адресу або поверніться до матеріалів GoldenWood."
          : "Check the address or return to GoldenWood materials."}
      </p>
      <Button href={`/${locale}`}>
        {locale === "uk" ? "На головну" : "Back to home"}
      </Button>
    </section>
  );
}
