import { type Locale } from "@/content/repository";
import { forestOrganizations } from "@/content/hemp";
import { Trees } from "./icons";
export default function ForestSupport({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const uk = locale === "uk";
  return (
    <section
      className={compact ? "forest-support compact" : "forest-support section"}
      aria-label={
        uk ? "Підтримка збереження лісів" : "Support forest protection"
      }
    >
      <div className="forest-symbol">
        <Trees size={compact ? 27 : 40} strokeWidth={1.2} />
      </div>
      <div>
        <span className="eyebrow">
          {uk ? "ЛІС ПОТРЕБУЄ НАС" : "FORESTS NEED US"}
        </span>
        {!compact && (
          <h2>
            {uk
              ? "Допоможімо зберегти\nживі ліси."
              : "Help protect\nour living forests."}
          </h2>
        )}
        <p>
          {uk
            ? "Ми віримо в рослинні матеріали та в живі ліси. Долучайтеся до їх збереження: підтримайте ГО «Лісові ініціативи і суспільство» в Україні або Rainforest Trust — американську неприбуткову організацію, яка працює над захистом тропічних лісів у світі."
            : "We believe in plant-based materials and living forests. Join efforts to protect them: support ForestCom in Ukraine or Rainforest Trust, a U.S.-based nonprofit working to protect tropical forests around the world."}
        </p>
        <small>
          {uk
            ? "Внески добровільні та здійснюються на офіційних сайтах незалежних організацій. GoldenWood не збирає ці кошти."
            : "Contributions are voluntary and made through the independent organizations’ official websites. GoldenWood does not collect these funds."}
        </small>
      </div>
      <div className="forest-support-actions">
        {forestOrganizations.map((organization) => (
          <a
            key={organization.url}
            className={compact ? "text-link" : "button"}
            href={organization.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="support-region">
              {organization.region[locale]}
            </span>
            <span>{organization.action[locale]}</span>
            <span className="sr-only">
              {uk
                ? " — зовнішній сайт, нова вкладка"
                : " — external website, new tab"}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
