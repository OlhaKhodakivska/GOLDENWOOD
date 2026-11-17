import { type Locale } from "@/content/repository";
import { Photo, SectionIntro, Button } from "./ui";
import { Reveal } from "./MotionParts";
export default function LogisticsSection({ locale }: { locale: Locale }) {
  const uk = locale === "uk";
  return (
    <section className="section transport-section">
      <Reveal className="transport-heading">
        <SectionIntro
          eyebrow={uk ? "ЛОГІСТИКА GOLDENWOOD" : "GOLDENWOOD LOGISTICS"}
          title={
            uk
              ? "Від складу —\nдо вашого виробництва."
              : "From the warehouse —\nto your production."
          }
        />
        <div>
          <p>
            {uk
              ? "Матеріал має прибути у зрозумілому форматі. Узгоджуємо пакування, маркування, маршрут і умови розвантаження під конкретну партію."
              : "Materials should arrive in a clearly defined format. Packaging, labeling, route and unloading conditions are agreed for the specific batch."}
          </p>
          <Button href={`/${locale}/request`}>
            {uk ? "Обговорити доставку" : "Discuss delivery"}
          </Button>
        </div>
      </Reveal>
      <div className="transport-steps">
        {(uk
          ? [
              "Підготовка й маркування",
              "Погодження маршруту",
              "Доставка та приймання",
            ]
          : [
              "Preparation & labeling",
              "Route agreement",
              "Delivery & acceptance",
            ]
        ).map((s) => (
          <div key={s}>
            <h3>{s}</h3>
          </div>
        ))}
      </div>
      <Reveal className="transport-image">
        <Photo
          name="trucks"
          alt={
            uk
              ? "Концептуальна візуалізація двох вантажних автомобілів із хвойним логотипом GoldenWood біля складу"
              : "Conceptual visualization of two freight trucks carrying the GoldenWood evergreen logo at a warehouse"
          }
        />
      </Reveal>
      <p className="image-caption">
        {uk
          ? "Концепція логістики GoldenWood. Згенерована візуалізація брендованого транспорту."
          : "GoldenWood logistics concept. AI-generated visualization of branded transport."}
      </p>
    </section>
  );
}
