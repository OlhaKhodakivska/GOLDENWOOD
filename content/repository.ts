import { z } from "zod";
export type Locale = "uk" | "en";
export type Localized = Record<Locale, string>;
export const text = (uk: string, en: string): Localized => ({ uk, en });
export const productSchema = z.object({
  slug: z.string(),
  name: z.object({ uk: z.string(), en: z.string() }),
  type: z.enum(["fiber", "hurd", "input", "seed"]),
  image: z.string(),
  description: z.object({ uk: z.string(), en: z.string() }),
  applications: z.array(z.string()),
  stage: z.number(),
});
export type Product = z.infer<typeof productSchema>;
export const industries = [
  {
    slug: "construction",
    name: text("Будівельні матеріали", "Building materials"),
    description: text(
      "Костриця як рослинний заповнювач для сумішей. Фракція та сумісність із в’яжучим потребують перевірки.",
      "Hurd as a plant-based aggregate for mixtures. Particle size and binder compatibility require testing.",
    ),
  },
  {
    slug: "composites",
    name: text("Біокомпозити", "Biocomposites"),
    description: text(
      "Волокно для армування композитів. Склад, довжина й підготовка узгоджуються з технологом.",
      "Fiber for composite reinforcement. Composition, length and preparation are agreed with your technologist.",
    ),
  },
  {
    slug: "paper",
    name: text("Целюлоза та папір", "Pulp & paper"),
    description: text(
      "Рослинні фракції для дослідження у целюлозно-паперових процесах. Потрібні технологічні проби.",
      "Plant fractions for evaluation in pulp and paper processes. Process trials are required.",
    ),
  },
  {
    slug: "nonwoven",
    name: text("Неткані матеріали", "Nonwoven materials"),
    description: text(
      "Коротке волокно для нетканих структур за вимогами до чистоти й однорідності.",
      "Short fiber for nonwoven structures, subject to cleanliness and uniformity requirements.",
    ),
  },
  {
    slug: "textile",
    name: text("Текстильні ланцюги", "Textile supply chains"),
    description: text(
      "Декортиковане волокно як вхід для подальшої спеціалізованої підготовки. Не є готовим прядильним волокном.",
      "Decorticated fiber as an input for further specialist preparation. It is not ready-to-spin fiber.",
    ),
  },
  {
    slug: "absorbent",
    name: text("Підстилка й абсорбенти", "Bedding & absorbents"),
    description: text(
      "Костриця для підстилкових та абсорбувальних матеріалів після оцінки пилу й характеристик партії.",
      "Hurd for bedding and absorbent materials after assessment of dust and batch characteristics.",
    ),
  },
  {
    slug: "food",
    name: text("Харчові інгредієнти", "Food ingredients"),
    description: text(
      "Насіння для харчової переробки: очищення, безпечність та відповідність вимогам покупця підтверджуються для конкретної партії. Посівне насіння не є харчовим за замовчуванням.",
      "Seed for food processing: cleaning, safety and buyer requirements must be verified for the specific batch. Sowing seed is not food-grade by default.",
    ),
  },
  {
    slug: "cultivation",
    name: text("Посівний напрям", "Cultivation"),
    description: text(
      "Призначення, сорт, схожість, походження та необхідні документи посівного матеріалу перевіряються окремо. Наявність посівної партії уточнюється під час запиту.",
      "Intended use, variety, germination, origin and required sowing-seed documents are checked separately. Availability of a sowing batch is discussed during the inquiry.",
    ),
  },
];
export const products: Product[] = z.array(productSchema).parse([
  {
    slug: "decorticated-fiber",
    name: text("Декортиковане волокно", "Decorticated hemp fiber"),
    type: "fiber",
    image: "long-fiber",
    description: text(
      "Довге рослинне волокно, відокремлене від деревинної частини стебла механічним способом. Основа для подальшої промислової підготовки.",
      "Long plant fiber mechanically separated from the woody stem core. A foundation for further industrial preparation.",
    ),
    applications: ["composites", "textile", "paper"],
    stage: 3,
  },
  {
    slug: "short-fiber",
    name: text("Коротке конопляне волокно", "Short hemp fiber"),
    type: "fiber",
    image: "short-fiber",
    description: text(
      "Коротша волокниста фракція первинної переробки. Підбирається під вимоги до структури та технології покупця.",
      "A shorter fibrous fraction from primary processing, selected for the buyer’s structural and processing requirements.",
    ),
    applications: ["nonwoven", "composites", "paper"],
    stage: 4,
  },
  {
    slug: "hemp-hurd",
    name: text("Конопляна костриця", "Hemp hurd"),
    type: "hurd",
    image: "hurd",
    description: text(
      "Деревинна серцевина стебла після відокремлення волокна та сортування. Природна фактура для виробничих застосувань.",
      "The woody stem core after fiber separation and sorting. A natural material for manufacturing applications.",
    ),
    applications: ["construction", "absorbent"],
    stage: 4,
  },
  {
    slug: "milled-hurd",
    name: text("Подрібнена костриця", "Crushed hemp hurd"),
    type: "hurd",
    image: "milled-hurd",
    description: text(
      "Дрібніша деревинна фракція костриці. Ступінь подрібнення та однорідність погоджуються під конкретний процес.",
      "A smaller woody hurd fraction. Degree of size reduction and uniformity are agreed for the specific process.",
    ),
    applications: ["construction", "composites", "absorbent"],
    stage: 4,
  },
  {
    slug: "retted-stalks",
    name: text("Конопляна треста", "Retted hemp stalks"),
    type: "input",
    image: "retted-stalks",
    description: text(
      "Підготовлена стеблова сировина для подальшої механічної переробки. Вхідний матеріал виробничого ланцюга.",
      "Prepared stalk raw material for further mechanical processing. An input to the production chain.",
    ),
    applications: ["textile", "paper"],
    stage: 2,
  },
  {
    slug: "hemp-seeds",
    name: text("Насіння технічних конопель", "Industrial hemp seeds"),
    type: "seed",
    image: "hemp-seeds",
    description: text(
      "Ціле насіння технічних конопель для погодженого напряму переробки. Харчове або посівне призначення, підготовка та документи визначаються для окремої партії.",
      "Whole industrial hemp seeds for an agreed processing purpose. Food or sowing use, preparation and documentation are established for the individual batch.",
    ),
    applications: ["food", "cultivation"],
    stage: 1,
  },
]);
export const stages = [
  {
    name: text("Вирощування", "Cultivation"),
    image: "field",
    description: text(
      "Плануємо культуру під майбутній матеріал: від вибору посівного матеріалу до спостереження за станом стебла. Агрономічні рішення узгоджуються із сезоном і умовами поля.",
      "We plan cultivation around the intended material, from seed selection to observing stem condition. Agronomic decisions depend on the season and field conditions.",
    ),
  },
  {
    name: text("Збирання", "Harvesting"),
    image: "harvest",
    description: text(
      "Вибираємо час і спосіб збирання з огляду на цільове застосування стебла. Контролюємо підготовку сировини до наступного етапу.",
      "Harvest timing and method reflect the intended use of the stalk. Raw material is prepared for the next stage.",
    ),
  },
  {
    name: text("Підготовка", "Preparation"),
    image: "retted-stalks",
    description: text(
      "Оцінюємо стан трести, організовуємо сушіння, зберігання та подачу стебел. Кожна вхідна партія отримує ідентифікатор.",
      "We assess retted stalk condition and organize drying, storage and feeding. Every input batch receives an identifier.",
    ),
  },
  {
    name: text("Декортикація", "Decortication"),
    image: "line",
    description: text(
      "Механічно розділяємо стебло на волокнисту та деревинну частини. Це первинна переробка без обіцянок котонізації чи дегумування.",
      "We mechanically separate the fibrous and woody parts of the stem. This is primary processing, without claims of cottonization or degumming.",
    ),
  },
  {
    name: text("Сортування", "Sorting"),
    image: "factory",
    description: text(
      "Розділяємо фракції та оцінюємо характеристики матеріалу. Показники чистоти, вологості та розмірів фіксуються у специфікації партії.",
      "We separate fractions and assess material characteristics. Cleanliness, moisture and dimensions are recorded in the batch specification.",
    ),
  },
  {
    name: text("Пакування й постачання", "Packing & dispatch"),
    image: "warehouse",
    description: text(
      "Погоджуємо формат пакування, маркування, документи та логістику. Обсяг і період відвантаження уточнюються в пропозиції.",
      "We agree packaging, labeling, documentation and logistics. Volume and dispatch period are specified in the offer.",
    ),
  },
];
export const articles = [
  {
    slug: "fiber-and-hurd",
    title: text(
      "Волокно та костриця: різні матеріали одного стебла",
      "Fiber and hurd: different materials from one stalk",
    ),
    image: "long-fiber",
    tag: text("Матеріалознавство", "Materials"),
    sections: [
      {
        title: text(
          "Дві частини — різні завдання",
          "Two parts, different purposes",
        ),
        body: text(
          "Стебло технічних конопель містить зовнішні волокнисті пучки та деревинну серцевину. Механічна декортикація розділяє їх, але не робить усі отримані матеріали однаковими. Волокно має видовжену структуру; костриця складається з коротких деревинних частинок. Саме ця різниця визначає, які параметри потрібно перевіряти перед застосуванням.",
          "An industrial hemp stalk contains outer fiber bundles and a woody core. Mechanical decortication separates them, but does not make the resulting materials interchangeable. Fiber has an elongated structure; hurd consists of short woody particles. This distinction determines the parameters to test before use.",
        ),
      },
      {
        title: text("Що перевіряти у волокні", "What to assess in fiber"),
        body: text(
          "Для волокна важливі розподіл довжини, частка невідокремленої костриці, вологість і поведінка на обладнанні. Декортиковане волокно зазвичай потребує додаткової підготовки перед спеціалізованими текстильними процесами. Назва матеріалу сама по собі не підтверджує придатність до прядіння або конкретної композитної системи.",
          "For fiber, length distribution, residual hurd, moisture and processing behavior matter. Decorticated fiber generally needs further preparation before specialist textile processes. The material name alone does not establish suitability for spinning or a specific composite system.",
        ),
      },
      {
        title: text("Що перевіряти у костриці", "What to assess in hurd"),
        body: text(
          "Для костриці покупець визначає бажаний фракційний склад, допустимий пил і вимоги до пакування. У будівельній суміші потрібно перевірити сумісність із в’яжучим; у підстилці — відповідність конкретному сценарію використання. Спочатку погодьте специфікацію, далі перевірте репрезентативний зразок і тільки потім визначайте партію постачання.",
          "For hurd, the buyer specifies particle size distribution, dust limits and packaging. Building mixtures require binder compatibility tests; bedding requires assessment for the intended use. Agree a specification, test a representative sample, then determine the supply batch.",
        ),
      },
    ],
  },
  {
    slug: "prepare-an-inquiry",
    title: text(
      "Які дані підготувати для запиту на сировину",
      "What to prepare for a raw material inquiry",
    ),
    image: "warehouse",
    tag: text("Для закупівельників", "Procurement"),
    sections: [
      {
        title: text("Почніть із застосування", "Start with the application"),
        body: text(
          "Опишіть продукт, який плануєте виготовляти, і етап, на якому вводиться рослинна сировина. Додайте відомі обмеження обладнання, потребу в очищенні чи підготовці, а також вимоги до супровідних документів. Якщо ви ще досліджуєте технологію, достатньо прямо зазначити, що потрібна консультація та зразки.",
          "Describe the product you plan to manufacture and the stage where plant material is introduced. Include known equipment constraints, cleaning or preparation needs, and documentation requirements. If you are still exploring the technology, simply say that you need consultation and samples.",
        ),
      },
      {
        title: text(
          "Сформулюйте технічні очікування",
          "Describe technical expectations",
        ),
        body: text(
          "Зазначте бажаний тип матеріалу та параметри, які впливають на ваш процес: фракцію, довжину волокна, чистоту чи вологість. Не підставляйте випадкові нормативи. Якщо параметр невідомий, позначте його для спільного узгодження. Додайте прийнятний спосіб пакування та умови розвантаження на вашому майданчику.",
          "Specify the material type and parameters that affect your process: particle size, fiber length, cleanliness or moisture. Avoid arbitrary limits. Mark unknown parameters for joint discussion. Include acceptable packaging and unloading conditions at your site.",
        ),
      },
      {
        title: text(
          "Обсяг і час можуть бути орієнтовними",
          "Volume and timing may be approximate",
        ),
        body: text(
          "Для першого звернення можна надати діапазон обсягу або вибрати консультацію. Розрізняйте тестову партію і регулярну потребу. Вкажіть країну доставки та бажаний період. Ці дані дозволяють обговорити можливість постачання без передчасної обіцянки ціни, строків чи мінімального обсягу.",
          "For an initial inquiry, provide a volume range or select consultation. Distinguish a trial batch from recurring demand. State the destination country and desired period. These details support a supply discussion without premature promises on price, lead time or minimum volume.",
        ),
      },
    ],
  },
  {
    slug: "field-to-batch",
    title: text(
      "Від поля до партії: етапи первинної переробки",
      "From field to batch: primary processing stages",
    ),
    image: "harvest",
    tag: text("Виробництво", "Production"),
    sections: [
      {
        title: text(
          "Матеріал починається в полі",
          "The material begins in the field",
        ),
        body: text(
          "Вибір культури, умови сезону та спосіб збирання впливають на стеблову сировину. Підготовка трести має узгоджуватися з наступною переробкою. На цьому етапі важливо зберегти відомості про походження й умови підготовки, щоб пов’язати їх із характеристиками отриманих фракцій.",
          "Crop selection, seasonal conditions and harvesting method influence the stalk raw material. Retting and preparation must suit subsequent processing. Records of origin and preparation help relate these conditions to the characteristics of the resulting fractions.",
        ),
      },
      {
        title: text("Механічне розділення", "Mechanical separation"),
        body: text(
          "Підготовлені стебла надходять на декортикацію. Механічна дія допомагає відокремити волокнисту частину від серцевини; далі відбувається сортування. Різні фракції мають різне призначення. Первинне механічне розділення не слід ототожнювати з дегумуванням або котонізацією, для яких потрібні окремі технології.",
          "Prepared stalks enter decortication. Mechanical action separates fiber from the core, followed by sorting. Different fractions serve different purposes. Primary mechanical separation should not be equated with degumming or cottonization, which require separate technologies.",
        ),
      },
      {
        title: text(
          "Партія, специфікація, відвантаження",
          "Batch, specification, dispatch",
        ),
        body: text(
          "Результати оцінки матеріалу прив’язують до ідентифікатора партії. Погоджена специфікація визначає, що саме перевіряють і за якою методикою. Зразок має представляти заплановану партію. Пакування, маркування й документи завершують ланцюг та допомагають покупцеві прийняти матеріал у власний виробничий процес.",
          "Material assessment results are linked to a batch identifier. The agreed specification defines what is tested and how. A sample should represent the intended batch. Packaging, labeling and documentation complete the chain and help the buyer introduce the material into production.",
        ),
      },
    ],
  },
];
export const pages: Record<
  string,
  {
    title: Localized;
    intro: Localized;
    image: string;
    sections: { title: Localized; body: Localized }[];
  }
> = {
  about: {
    title: text(
      "Об’єднуємо землю, технологію та промисловість.",
      "Connecting land, technology and industry.",
    ),
    intro: text(
      "GoldenWood — концепція агропромислового холдингу з єдиним поглядом на шлях рослинної сировини.",
      "GoldenWood is an agro-industrial holding concept with an integrated view of the plant material supply chain.",
    ),
    image: "field",
    sections: [
      {
        title: text(
          "Один ланцюг відповідальності",
          "One chain of responsibility",
        ),
        body: text(
          "Вирощування, підготовка стебел, механічна переробка та постачання мають працювати як пов’язана система. Ми будуємо модель співпраці, у якій рішення в полі враховують потреби майбутнього покупця.",
          "Cultivation, stalk preparation, mechanical processing and supply should function as a connected system. Our collaboration model links field decisions to the future buyer’s needs.",
        ),
      },
      {
        title: text(
          "Партнерство через конкретику",
          "Partnership through clarity",
        ),
        body: text(
          "Спочатку визначаємо застосування та критерії приймання. Потім узгоджуємо зразки, характеристики партії, пакування й логістику. Цей сайт представляє концепцію; фотографії не підтверджують наявності виробничих активів.",
          "First we establish the application and acceptance criteria. Then we agree samples, batch characteristics, packaging and logistics. This website presents a concept; photographs do not establish ownership of production assets.",
        ),
      },
    ],
  },
  sustainability: {
    title: text(
      "Відповідальність починається з процесу.",
      "Responsibility begins with the process.",
    ),
    intro: text(
      "Працюємо над ощадливим використанням рослинної сировини й прозорістю виробничих рішень.",
      "We aim for careful use of plant raw materials and transparency in production decisions.",
    ),
    image: "field",
    sections: [
      {
        title: text(
          "Використовувати потенціал стебла",
          "Use the potential of the stalk",
        ),
        body: text(
          "Розділення на волокно й кострицю відкриває різні напрями використання. Наша мета — знаходити відповідне застосування для кожної придатної фракції та обліковувати залишки. Це підхід, а не підтверджена заява про безвідходність.",
          "Separation into fiber and hurd creates different uses. Our aim is to find suitable applications for usable fractions and account for residues. This is an approach, not a verified zero-waste claim.",
        ),
      },
      {
        title: text(
          "Вимірювати перед тим, як стверджувати",
          "Measure before making claims",
        ),
        body: text(
          "Оцінка впливу потребує даних про енергію, воду, логістику та методику розрахунку. Ми не заявляємо вуглецевої негативності або сертифікації без незалежно підтверджених результатів.",
          "Impact assessment requires energy, water and logistics data and a defined methodology. We make no carbon-negative or certification claims without independently verified results.",
        ),
      },
    ],
  },
  partners: {
    title: text(
      "Вирощуємо майбутню співпрацю.",
      "Growing our next partnership.",
    ),
    intro: text(
      "Для агровиробників, які розглядають технічні коноплі як частину виробничої програми.",
      "For agricultural producers considering industrial hemp as part of their production program.",
    ),
    image: "harvest",
    sections: [
      {
        title: text("Почнімо з вашого поля", "Let’s start with your field"),
        body: text(
          "Розкажіть про регіон, орієнтовну площу, доступну техніку та досвід зі стебловими культурами. Площа на цьому етапі є інформацією для обговорення, а не зобов’язанням.",
          "Tell us your region, approximate area, available equipment and experience with stalk crops. At this stage, acreage is information for discussion, not a commitment.",
        ),
      },
      {
        title: text(
          "Узгодити умови до сезону",
          "Agree conditions before the season",
        ),
        body: text(
          "Обговорюємо вимоги до сировини, збирання, підготовки, зберігання й логістики. Вирощування та обіг мають відповідати чинним місцевим вимогам; юридичні й агрономічні умови перевіряються до початку робіт.",
          "We discuss raw material, harvesting, preparation, storage and logistics requirements. Cultivation and trade must meet applicable local requirements; legal and agronomic conditions are checked before work begins.",
        ),
      },
    ],
  },
};
export const faq = [
  {
    q: text(
      "Як обрати матеріал для мого виробництва?",
      "How do I choose a material for my process?",
    ),
    a: text(
      "Почніть із галузі застосування та опишіть ваш процес у запиті. Узгодимо перелік характеристик і порядок перевірки зразка. Придатність визначається випробуваннями конкретної партії.",
      "Start with your application and describe your process in the inquiry. We can discuss characteristics and sample evaluation. Suitability is established by testing the specific batch.",
    ),
  },
  {
    q: text("Чи можна отримати зразки?", "Can I request samples?"),
    a: text(
      "Так, оберіть тип звернення «Зразки» та матеріал. Обсяг, підготовка, доступність і доставка зразків погоджуються індивідуально.",
      "Select “Samples” and your material in the inquiry. Sample volume, preparation, availability and shipping are agreed individually.",
    ),
  },
  {
    q: text(
      "Який мінімальний обсяг постачання?",
      "What is the minimum supply volume?",
    ),
    a: text(
      "Обсяг уточнюється під час запиту з урахуванням матеріалу, пакування та логістики. Якщо потреба ще невідома, оберіть консультацію.",
      "Volume is discussed during the inquiry, taking material, packaging and logistics into account. Select consultation if your needs are still being explored.",
    ),
  },
  {
    q: text(
      "Чи є технічна специфікація партії?",
      "Is a batch specification available?",
    ),
    a: text(
      "Перелік параметрів, методики перевірки та критерії приймання погоджуються з покупцем. Запитайте специфікацію через форму разом із описом застосування.",
      "Parameters, test methods and acceptance criteria are agreed with the buyer. Request a specification through the form and describe your application.",
    ),
  },
];
export const repository = {
  getProducts: () => products,
  getProduct: (slug: string) => products.find((p) => p.slug === slug),
  getArticles: () => articles,
  getArticle: (slug: string) => articles.find((a) => a.slug === slug),
};
