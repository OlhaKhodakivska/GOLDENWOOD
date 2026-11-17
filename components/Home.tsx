import Link from "next/link";
import LogisticsSection from "./LogisticsSection";
import ScrollCue from "./ScrollCue";
import { HeroVisual } from "./HomeNavigation";
import {
  Layers,
  Waves,
  Factory,
  Sprout,
  ShieldCheck,
  PackageCheck,
} from "./icons";
import {
  type Locale,
  products,
  industries,
  articles,
} from "@/content/repository";
import { Photo, Button, SectionIntro, ProductCard, CTA } from "./ui";
import { ProcessExplorer, FAQAccordion } from "./Interactive";
export default function Home({ locale }: { locale: Locale }) {
  const uk = locale === "uk";
  return (
    <>
      <section className="hero" id="top">
        <HeroVisual locale={locale} />
        <div className="hero-content">
          <span className="eyebrow">
            <i />
            {uk
              ? "ВІД ЗЕМЛІ — ДО НОВИХ МОЖЛИВОСТЕЙ"
              : "FROM THE LAND — TO NEW POSSIBILITIES"}
          </span>
          <h1 id="home-heading" tabIndex={-1}>
            {uk ? (
              <>
                Вирощуємо ресурс.
                <br />
                Створюємо основу
                <br />
                для <em>промисловості.</em>
              </>
            ) : (
              <>
                Growing resources.
                <br />
                Creating a foundation
                <br />
                for <em>industry.</em>
              </>
            )}
          </h1>
          <p>
            {uk
              ? "Технічні коноплі, первинна переробка та оптове постачання рослинної сировини для виробничих компаній."
              : "Industrial hemp, primary processing and wholesale supply of plant-based raw materials for manufacturing companies."}
          </p>
          <div className="hero-actions">
            <Button href={`/${locale}/products`}>
              {uk ? "Переглянути сировину" : "Explore materials"}
            </Button>
            <Link className="hero-link" href={`/${locale}/request`}>
              {uk ? "Обговорити постачання" : "Discuss supply"}
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <span>UKRAINIAN ROOTS. INDUSTRIAL VISION.</span>
          <ScrollCue
            locale={locale}
            target="introduction"
            label={uk ? "Далі про холдинг" : "Learn about the holding"}
          />
        </div>
      </section>
      <div className="introduction-screen" id="introduction">
        <nav
          className="resource-highlights"
          aria-label={uk ? "Знайомство з GoldenWood" : "Discover GoldenWood"}
        >
          {[
            {
              label: uk
                ? "Багато можливостей однієї рослини"
                : "One plant, many possibilities",
              note: uk
                ? "Познайомтеся з технічними коноплями"
                : "Get to know industrial hemp",
              href: `/${locale}/hemp`,
            },
            {
              label: uk
                ? "Матеріали для вашого виробництва"
                : "Materials for your production",
              note: uk
                ? "Волокно, костриця та насіння"
                : "Fiber, hurd and seeds",
              href: `/${locale}/products`,
            },
            {
              label: uk ? "Від поля до постачання" : "From field to supply",
              note: uk
                ? "Дослідіть шлях сировини"
                : "Explore the material journey",
              href: `/${locale}/production`,
            },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <span className="resource-label">{item.label}</span>
              <span className="resource-note">{item.note}</span>
            </Link>
          ))}
        </nav>
        <section className="section intro-section reveal">
          <div>
            <span className="eyebrow">
              <i /> {uk ? "МИ — GOLDENWOOD" : "WE ARE GOLDENWOOD"}
            </span>
            <h2>
              {uk ? (
                <>
                  Природний потенціал.
                  <br />
                  <span className="muted">Промисловий підхід.</span>
                </>
              ) : (
                <>
                  Natural potential.
                  <br />
                  <span className="muted">An industrial approach.</span>
                </>
              )}
            </h2>
          </div>
          <div className="intro-copy">
            <p>
              {uk
                ? "Ми поєднуємо агровиробництво та технології первинної переробки, щоб перетворювати технічні коноплі на зрозумілу, підготовлену сировину для бізнесу."
                : "We connect agriculture and primary processing technology to turn industrial hemp into clearly specified, prepared raw materials for business."}
            </p>
            <p className="small-copy">
              {uk
                ? "Від рішення в полі до характеристик партії — бачимо весь шлях матеріалу та його місце у вашому виробництві."
                : "From field decisions to batch characteristics, we consider the entire journey of the material and its role in your production."}
            </p>
            <Link className="text-link" href={`/${locale}/about`}>
              {uk ? "Більше про холдинг" : "About the holding"}
            </Link>
          </div>
        </section>
      </div>
      <section className="section process-section reveal">
        <div className="section-heading">
          <SectionIntro
            eyebrow={
              uk ? "ЄДИНИЙ ВИРОБНИЧИЙ ЛАНЦЮГ" : "ONE CONNECTED PRODUCTION CHAIN"
            }
            title={uk ? "Від насіння до матеріалу." : "From seed to material."}
          />
          <p>
            {uk
              ? "Шість пов’язаних етапів.\nОдна логіка якості."
              : "Six connected stages.\nOne approach to quality."}
          </p>
        </div>
        <ProcessExplorer locale={locale} />
      </section>
      <section className="section materials-section reveal">
        <div className="section-heading">
          <SectionIntro
            eyebrow={uk ? "ПОРТФЕЛЬ МАТЕРІАЛІВ" : "MATERIAL PORTFOLIO"}
            title={
              uk
                ? "Природа дає основу.\nМи відкриваємо можливості."
                : "Nature provides the foundation.\nWe open up possibilities."
            }
          />
          <Link className="text-link" href={`/${locale}/products`}>
            {uk ? "Уся сировина" : "All materials"}
          </Link>
        </div>
        <div className="product-grid">
          {[products[0], products[2], products[5]].map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} />
          ))}
        </div>
        <div className="material-caption">
          <span>
            {uk
              ? "ВОЛОКНО · КОСТРИЦЯ · НАСІННЯ · СТЕБЛОВА СИРОВИНА"
              : "FIBER · HURD · SEEDS · STALK RAW MATERIAL"}
          </span>
          <p>
            {uk
              ? "Характеристики та пакування погоджуються під ваш виробничий процес."
              : "Characteristics and packaging are agreed for your production process."}
          </p>
        </div>
      </section>
      <section className="industry-section section reveal">
        <div className="industry-intro">
          <SectionIntro
            eyebrow={uk ? "ГАЛУЗІ ЗАСТОСУВАННЯ" : "INDUSTRIAL APPLICATIONS"}
            title={
              uk
                ? "Одна рослина.\nРізні індустрії."
                : "One plant.\nMany industries."
            }
            description={
              uk
                ? "Сировина набуває цінності, коли відповідає конкретній задачі виробництва."
                : "A raw material creates value when it meets a specific manufacturing need."
            }
          />
          <Button href={`/${locale}/industries`} secondary>
            {uk ? "Знайти своє застосування" : "Find your application"}
          </Button>
          <small>
            {uk
              ? "Придатність партії підтверджується характеристиками та випробуваннями."
              : "Batch suitability is established through specifications and testing."}
          </small>
        </div>
        <div className="industry-links">
          {industries.slice(0, 6).map((i, index) => {
            const Icon = [Layers, Factory, Waves, Layers, Sprout, PackageCheck][
              index
            ];
            return (
              <Link key={i.slug} href={`/${locale}/industries#${i.slug}`}>
                <Icon size={25} strokeWidth={1.2} />
                <span>{i.name[locale]}</span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="production-feature production-above reveal">
        <div className="production-copy">
          <span className="eyebrow">
            {uk
              ? "ТЕХНОЛОГІЇ, ЩО ПРАЦЮЮТЬ ІЗ ПРИРОДОЮ"
              : "TECHNOLOGY WORKING WITH NATURE"}
          </span>
          <h2>
            {uk
              ? "Точність процесу.\nЦінність результату."
              : "Process precision.\nMaterial value."}
          </h2>
          <p>
            {uk
              ? "Механічне розділення, підготовка та сортування. Кожен етап має свою задачу — зберегти потенціал сировини для наступного виробничого циклу."
              : "Mechanical separation, preparation and sorting. Each stage has a purpose: preserve the potential of raw materials for the next production cycle."}
          </p>
          <Button href={`/${locale}/production`}>
            {uk ? "Дослідити виробництво" : "Explore production"}
          </Button>
          <small>
            {uk
              ? "Згенерована концептуальна візуалізація."
              : "AI-generated conceptual visualization."}
          </small>
        </div>
        <Photo
          name="factory"
          alt={
            uk
              ? "Концептуальна візуалізація цеху механічної переробки"
              : "Conceptual visualization of a mechanical processing hall"
          }
        />
      </section>
      <section className="section quality-section reveal">
        <SectionIntro
          eyebrow={uk ? "ПРОЗОРІСТЬ У ДЕТАЛЯХ" : "TRANSPARENCY IN THE DETAILS"}
          title={
            uk
              ? "Не просто матеріал.\nЗрозуміла партія."
              : "More than a material.\nA clearly defined batch."
          }
        />
        <div className="quality-grid">
          {[
            {
              Icon: ShieldCheck,
              title: uk ? "Погоджені характеристики" : "Agreed characteristics",
              body: uk
                ? "Чистота, вологість і фракційний склад — за специфікацією та вимогами покупця."
                : "Cleanliness, moisture and fraction composition, according to the specification and buyer requirements.",
            },
            {
              Icon: Layers,
              title: uk ? "Простежуваність" : "Traceability",
              body: uk
                ? "Ідентифікація партій і зв’язок між підготовкою сировини та отриманими матеріалами."
                : "Batch identification links raw material preparation to resulting materials.",
            },
            {
              Icon: PackageCheck,
              title: uk ? "Готовність до постачання" : "Prepared for supply",
              body: uk
                ? "Пакування, маркування та логістичні умови, узгоджені до відвантаження."
                : "Packaging, labeling and logistics conditions agreed before dispatch.",
            },
          ].map(({ Icon, title, body }) => (
            <div key={title}>
              <Icon size={30} strokeWidth={1.2} />
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section responsibility reveal">
        <Photo
          name="field"
          alt={
            uk
              ? "Ряди високих стебел технічних конопель"
              : "Rows of tall industrial hemp stalks"
          }
        />
        <div>
          <SectionIntro
            eyebrow={
              uk ? "ВІДПОВІДАЛЬНЕ ВИРОБНИЦТВО" : "RESPONSIBLE PRODUCTION"
            }
            title={
              uk
                ? "Повага до ресурсу.\nУ кожному рішенні."
                : "Respect for resources.\nIn every decision."
            }
            description={
              uk
                ? "Шукаємо застосування для різних фракцій стебла й розглядаємо ресурс як цілісну систему. Говоримо про підходи та цілі, а результати мають спиратися на вимірювання."
                : "We seek uses for different stalk fractions and consider resources as a connected system. We describe approaches and goals; results must be supported by measurement."
            }
          />
          <Link className="text-link" href={`/${locale}/sustainability`}>
            {uk
              ? "Наш підхід до відповідальності"
              : "Our approach to responsibility"}
          </Link>
        </div>
      </section>
      <section className="section hemp-teaser discovery-feature reveal">
        <div>
          <SectionIntro
            eyebrow={uk ? "ЧИ ЗНАЛИ ВИ?" : "DID YOU KNOW?"}
            title={uk ? "Від шкарпеток — до будинків." : "From socks to homes."}
            description={
              uk
                ? "Одяг, меблі, чохли на телефон, будівельні матеріали та харчові інгредієнти. Відкрийте потенціал рослини, яка дає врожай за сезон."
                : "Clothes, furniture, phone cases, building materials and food ingredients. Explore the potential of a plant harvested within a season."
            }
          />
          <div className="discovery-topics">
            {[
              {
                title: uk ? "Волокно стає тканиною" : "Fiber becomes fabric",
                body: uk
                  ? "Зовнішня частина стебла дає волокно для пряжі, тканин, нетканих матеріалів і композитів. Результат залежить від підготовки та технології переробки."
                  : "The outer stalk provides fiber for yarn, textiles, nonwovens and composites. The result depends on preparation and processing technology.",
              },
              {
                title: uk
                  ? "Костриця знаходить місце в будинку"
                  : "Hurd finds a place in buildings",
                body: uk
                  ? "Деревинну серцевину використовують як рослинний заповнювач у конопляно-вапняних сумішах. Інші застосування — підстилка та абсорбенти."
                  : "The woody core is used as a plant-based aggregate in hemp-lime mixes. Other applications include bedding and absorbents.",
              },
              {
                title: uk
                  ? "Насіння відкриває інший напрям"
                  : "Seeds open another chapter",
                body: uk
                  ? "Харчове насіння переробляють на олію, очищене ядро та білкові інгредієнти. Для посіву потрібен відповідний посівний матеріал — призначення партії важливо визначити заздалегідь."
                  : "Food-grade seeds can become oil, hulled seeds and protein ingredients. Sowing requires suitable planting seed, so each batch needs a clearly defined purpose.",
              },
            ].map((topic) => (
              <details key={topic.title}>
                <summary>
                  {topic.title}
                  <span aria-hidden="true" className="discovery-toggle" />
                </summary>
                <p>{topic.body}</p>
              </details>
            ))}
          </div>
          <p className="eco-note">
            {uk
              ? "Екологічно чистий продукт — наш орієнтир: простежувана сировина, контроль якості й дбайливе вирощування. Властивості конкретної партії потребують підтвердження."
              : "An environmentally sound product is our ambition: traceable materials, quality controls and careful cultivation. The properties of a specific batch require verification."}
          </p>
          <Button href={`/${locale}/hemp`}>
            {uk
              ? "Дослідити можливості конопель"
              : "Discover hemp’s possibilities"}
          </Button>
        </div>
        <Photo
          name="hemp-possibilities"
          alt={
            uk
              ? "Речі з конопляних матеріалів: концептуальна композиція"
              : "Conceptual arrangement of objects made with hemp materials"
          }
        />
      </section>
      <LogisticsSection locale={locale} />
      <section className="grower-section reveal">
        <div>
          <span className="eyebrow">
            {uk ? "АГРОВИРОБНИКАМ" : "FOR GROWERS"}
          </span>
          <h2>
            {uk
              ? "Ваше поле може стати\nпочатком нового ланцюга."
              : "Your field could be the start\nof a new supply chain."}
          </h2>
          <p>
            {uk
              ? "Розглядаєте вирощування технічних конопель? Обговорімо підготовку сировини, вимоги та можливі формати співпраці."
              : "Considering growing industrial hemp? Let’s discuss raw material preparation, requirements and potential collaboration."}
          </p>
          <Button href={`/${locale}/partners`}>
            {uk ? "Стати агропартнером" : "Explore grower partnership"}
          </Button>
        </div>
        <Photo
          name="harvest"
          alt={
            uk
              ? "Сільськогосподарська техніка на збиранні стеблової культури"
              : "Agricultural machinery harvesting stalk crops"
          }
        />
      </section>
      <section className="section knowledge-section journal-section reveal">
        <div className="section-heading">
          <SectionIntro
            eyebrow={uk ? "ЦЕНТР ЗНАНЬ" : "KNOWLEDGE CENTER"}
            title={
              uk
                ? "Розуміти матеріал.\nБачити можливості."
                : "Understand the material.\nSee the possibilities."
            }
          />
          <Link className="text-link" href={`/${locale}/knowledge`}>
            {uk ? "Усі матеріали" : "All articles"}
          </Link>
        </div>
        <div className="article-grid">
          {articles.map((a) => (
            <Link
              className="article-card"
              key={a.slug}
              href={`/${locale}/knowledge/${a.slug}`}
            >
              <Photo name={a.image} alt={a.title[locale]} />
              <span className="card-label">
                {a.tag[locale]} · {uk ? "5 хв читання" : "5 min read"}
              </span>
              <h3>{a.title[locale]}</h3>
              <span className="text-link">
                {uk ? "Читати статтю" : "Read article"}
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section faq-section reveal">
        <SectionIntro
          eyebrow={uk ? "ПОШИРЕНІ ЗАПИТАННЯ" : "COMMON QUESTIONS"}
          title={
            uk ? "Поговорімо\nпро важливе." : "Let’s talk\nabout what matters."
          }
        />
        <FAQAccordion locale={locale} />
      </section>
      <CTA locale={locale} />
    </>
  );
}
