import Link from "next/link";
import { type Locale } from "@/content/repository";
import { hempNature, hempStory } from "@/content/hemp";
import { PageHeading } from "./ContentPages";
import { Photo, SectionIntro, Button } from "./ui";
import { PossibilitiesExplorer, Reveal } from "./MotionParts";
import ForestSupport from "./ForestSupport";
export default function HempPage({ locale }: { locale: Locale }) {
  const uk = locale === "uk";
  return (
    <>
      <PageHeading
        background="page-hemp"
        locale={locale}
        eyebrow={
          uk
            ? "МОЖЛИВОСТІ ТЕХНІЧНИХ КОНОПЕЛЬ"
            : "THE POSSIBILITIES OF INDUSTRIAL HEMP"
        }
        title={uk ? "Від шкарпеток —\nдо будинків." : "From socks —\nto homes."}
        intro={
          uk
            ? "Одна рослина. Безліч продуманих речей. Досліджуйте, як волокно, костриця та насіння стають частиною нашого повсякденного життя."
            : "One plant. A world of considered objects. Explore how fiber, hurd and seeds become part of everyday life."
        }
      />
      <div className="wide-photo hemp-page-photo">
        <Photo
          name="hemp-possibilities"
          alt={
            uk
              ? "Концептуальна композиція: шкарпетки, тканина, чохол, будівельний зразок, папір і насіння"
              : "Conceptual arrangement of socks, fabric, a phone case, building sample, paper and hemp seeds"
          }
        />
      </div>
      <Reveal className="section hemp-introduction">
        <span className="eyebrow">
          {uk
            ? "РОСЛИНА З ВЕЛИКИМ ПОТЕНЦІАЛОМ"
            : "A PLANT WITH GREAT POTENTIAL"}
        </span>
        <h2>
          {uk
            ? "Більше, ніж сировина.\nІнший погляд на звичні речі."
            : "More than a raw material.\nA fresh view of familiar things."}
        </h2>
        <div>
          <p>
            {uk
              ? "Технічні коноплі вирощують заради різних частин рослини: зовнішнього волокна, деревинної серцевини та насіння. Кожна з них має власний шлях — у тканину, композит, будівельну суміш чи харчовий інгредієнт."
              : "Industrial hemp is grown for different parts of the plant: outer fiber, woody core and seed. Each follows its own path into fabric, a composite, a building mixture or a food ingredient."}
          </p>
          <p>
            {uk
              ? "Це огляд можливостей галузі. GoldenWood пропонує сировину та технічний діалог; готові речі нижче ілюструють потенціал подальшої переробки, а не асортимент готової продукції холдингу."
              : "This is an overview of industry possibilities. GoldenWood offers raw materials and a technical conversation; the finished objects below illustrate further processing potential rather than a range of finished products sold by the holding."}
          </p>
        </div>
      </Reveal>
      <section className="section possibilities-section">
        <SectionIntro
          eyebrow={
            uk
              ? "ВІСІМ НАПРЯМІВ ДЛЯ НОВИХ ІДЕЙ"
              : "EIGHT DIRECTIONS FOR NEW IDEAS"
          }
          title={
            uk
              ? "Уявіть, чим може\nстати одне стебло."
              : "Imagine what\none stalk can become."
          }
        />
        <PossibilitiesExplorer locale={locale} />
        <div className="hemp-catalog-links">
          <Button href={`/${locale}/products`}>
            {uk ? "Знайти сировину для ідеї" : "Find materials for your idea"}
          </Button>
          <Link className="text-link" href={`/${locale}/products/hemp-seeds`}>
            {uk ? "Дослідити насіння" : "Explore hemp seeds"}
          </Link>
        </div>
      </section>
      <section className="section hemp-nature">
        <SectionIntro
          eyebrow={
            uk
              ? "ПРИРОДНИЙ РЕСУРС І ВІДПОВІДАЛЬНИЙ ВИБІР"
              : "A NATURAL RESOURCE, A RESPONSIBLE CHOICE"
          }
          title={
            uk
              ? "Як вирощувати коноплі\nз повагою до землі."
              : "Growing hemp\nwith respect for the soil."
          }
        />
        <div className="hemp-nature-grid">
          {hempNature.map((item, i) => (
            <Reveal className="hemp-nature-card" key={i}>
              <h3>{item.title[locale]}</h3>
              <p>{item.body[locale]}</p>
            </Reveal>
          ))}
        </div>
        <p className="nature-conclusion">
          {uk
            ? "Потенціал конопель — у розумному використанні. Важливі не лише назва рослини, а й спосіб вирощування, склад готового виробу, енергія, транспорт і подальша доля матеріалу."
            : "Hemp’s potential lies in thoughtful use. What matters is not only the plant, but also cultivation, the finished product’s composition, energy, transport and the material’s next life."}
        </p>
      </section>
      <section
        className="section hemp-story"
        aria-labelledby="hemp-story-title"
      >
        <div className="story-intro">
          <span className="eyebrow">{hempStory.eyebrow[locale]}</span>
          <h2 id="hemp-story-title">{hempStory.title[locale]}</h2>
        </div>
        <div className="story-prose">
          {hempStory.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph[locale]}</p>
          ))}
        </div>
      </section>
      <ForestSupport locale={locale} />
    </>
  );
}
