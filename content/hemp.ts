import { text } from "./repository";
export const forestOrganizations = [
  {
    name: "ForestCom",
    region: text("Ліси України", "Forests of Ukraine"),
    action: text("Підтримати ForestCom", "Support ForestCom"),
    url: "https://www.forestcom.org.ua/donate",
  },
  {
    name: "Rainforest Trust",
    region: text(
      "Тропічні ліси світу · організація зі США",
      "Tropical forests worldwide · U.S.-based nonprofit",
    ),
    action: text("Підтримати Rainforest Trust", "Support Rainforest Trust"),
    url: "https://www.rainforesttrust.org/get-involved/ways-to-give/",
  },
];
export const hempSources = [
  {
    name: text(
      "Європейська комісія: технічні коноплі та їх застосування",
      "European Commission: industrial hemp and its uses",
    ),
    url: "https://agriculture.ec.europa.eu/farming/crops/hemp_en",
  },
  {
    name: text(
      "EU CAP Network: коноплі в органічній сівозміні",
      "EU CAP Network: hemp in organic crop rotation",
    ),
    url: "https://eu-cap-network.ec.europa.eu/projects/practice-abstracts/industrial-hemp-organic-crop-rotation-and-landscape-diversification_en",
  },
  {
    name: text(
      "Alberta Agriculture: агрономія, ріст і живлення конопель",
      "Alberta Agriculture: hemp agronomy, growth and nutrition",
    ),
    url: "https://www1.agric.gov.ab.ca/$department/deptdocs.nsf/all/agdex126",
  },
  {
    name: text(
      "University of Florida: волокно, насіння та продукти переробки",
      "University of Florida: fiber, seed and processing products",
    ),
    url: "https://ask.ifas.ufl.edu/publication/AG459",
  },
  {
    name: text(
      "IGEN: приклад чохла з льону та конопель",
      "IGEN: an example of a flax and hemp phone case",
    ),
    url: "https://igen.dk/en/collections/accessories/products/cover",
  },
];
export const hempApplications = [
  {
    id: "socks",
    category: "everyday",
    number: "01",
    title: text(
      "Від шкарпеток — до улюбленого одягу",
      "From socks to favorite clothes",
    ),
    material: text("Волокно · пряжа · тканина", "Fiber · yarn · fabric"),
    body: text(
      "Після очищення та текстильної підготовки конопляне волокно стає частиною пряжі для шкарпеток, сорочок, трикотажу й домашнього текстилю. Його також поєднують з іншими волокнами, щоб отримати потрібну м’якість і поведінку тканини.",
      "After cleaning and textile preparation, hemp fiber can become part of yarn for socks, shirts, knitwear and home textiles. It can be blended with other fibers to achieve the desired softness and fabric performance.",
    ),
  },
  {
    id: "houses",
    category: "building",
    number: "02",
    title: text(
      "Від стебла — до стін будинку",
      "From stalks to the walls of a home",
    ),
    material: text(
      "Костриця · в’яжуче · будівельний матеріал",
      "Hurd · binder · building material",
    ),
    body: text(
      "Кострицю поєднують із відповідним в’яжучим для конопляно-вапняних сумішей; волокно використовують у теплоізоляційних матеріалах. Так коноплі можуть бути частиною будинку. Несучі конструкції, вогнестійкість та інші вимоги визначаються проєктом і випробуваннями конкретної системи.",
      "Hurd can be combined with a suitable binder for hemp-lime mixtures, while fiber is used in insulation materials. Hemp can therefore become part of a home. Structural design, fire performance and other requirements depend on the project and tests of the specific system.",
    ),
  },
  {
    id: "furniture",
    category: "building",
    number: "03",
    title: text(
      "Меблі з новим поглядом на матеріал",
      "Furniture with a fresh material perspective",
    ),
    material: text(
      "Волокно або костриця · плита · композит",
      "Fiber or hurd · board · composite",
    ),
    body: text(
      "Пресовані плити, композитні деталі, оббивні тканини: різні фракції рослини відкривають різні меблеві сценарії. Міцність, склад зв’язувального та можливість повторної переробки залежать від рецептури й конструкції виробу.",
      "Pressed boards, composite components and upholstery fabrics give different plant fractions distinct roles in furniture. Strength, binder composition and recyclability depend on the formulation and product design.",
    ),
  },
  {
    id: "phone-cases",
    category: "everyday",
    number: "04",
    title: text(
      "Чохли на телефон і повсякденні речі",
      "Phone cases and everyday objects",
    ),
    material: text(
      "Рослинний наповнювач · полімерна матриця",
      "Plant filler · polymer matrix",
    ),
    body: text(
      "Конопляні компоненти можуть входити до сумішей для формованих виробів, зокрема чохлів на телефон. Це композит із кількох складників. Наявність конопель сама по собі не означає, що весь виріб можна компостувати вдома або переробити в будь-якій системі.",
      "Hemp components can be included in blends for molded products, including phone cases. These are composites with several ingredients. Hemp content alone does not mean the entire product is home-compostable or recyclable in every collection system.",
    ),
  },
  {
    id: "food",
    category: "food",
    number: "05",
    title: text(
      "Насіння, олія та рослинні інгредієнти",
      "Seeds, oil and plant-based ingredients",
    ),
    material: text(
      "Харчове насіння · пресування · інгредієнти",
      "Food-grade seed · pressing · ingredients",
    ),
    body: text(
      "З насіння виготовляють очищені ядра, олію, борошно та білкові інгредієнти. Їх використовують у випічці, сумішах і рослинних напоях. Для харчового напряму потрібні окрема підготовка, контроль безпечності та відповідність вимогам ринку; технічну партію не можна автоматично вважати харчовою.",
      "Seed can be processed into hulled kernels, oil, flour and protein ingredients for baking, blends and plant-based drinks. Food uses require dedicated preparation, safety controls and compliance with the destination market; an industrial batch is not automatically food-grade.",
    ),
  },
  {
    id: "paper",
    category: "everyday",
    number: "06",
    title: text(
      "Папір, пакування та міцні полотна",
      "Paper, packaging and durable fabrics",
    ),
    material: text(
      "Волокно · целюлоза · готовий матеріал",
      "Fiber · pulp · finished material",
    ),
    body: text(
      "Волокнисті фракції можуть бути сировиною для спеціальних видів паперу, пакувальних рішень, полотен і мотузок. Вид кінцевого продукту визначає, наскільки глибокою має бути підготовка та які характеристики потрібно перевірити.",
      "Fibrous fractions can supply specialty papers, packaging concepts, canvas and rope. The final product determines the depth of preparation and the characteristics that must be assessed.",
    ),
  },
  {
    id: "transport",
    category: "building",
    number: "07",
    title: text(
      "Легкі композити для промисловості",
      "Lightweight composites for industry",
    ),
    material: text(
      "Волокно · армування · технічна деталь",
      "Fiber · reinforcement · technical component",
    ),
    body: text(
      "Конопляне волокно застосовують як армувальний компонент у композитах, зокрема в автомобільних інтер’єрах. Результат залежить від матриці, обробки волокна та технології формування — саме тому співпраця починається з технічної специфікації.",
      "Hemp fiber is used as reinforcement in composites, including automotive interiors. Results depend on the matrix, fiber treatment and molding process, which is why collaboration starts with a technical specification.",
    ),
  },
  {
    id: "bedding",
    category: "everyday",
    number: "08",
    title: text(
      "Підстилка та абсорбувальні матеріали",
      "Bedding and absorbent materials",
    ),
    material: text(
      "Костриця · очищення · сортування",
      "Hurd · cleaning · sorting",
    ),
    body: text(
      "Деревинна частина стебла також знаходить застосування в підстилці та абсорбувальних матеріалах. Фракцію, пил, умови зберігання й приймальні критерії узгоджують для конкретного сценарію.",
      "The woody stem core also finds applications in bedding and absorbent materials. Particle size, dust, storage conditions and acceptance criteria are agreed for the specific use.",
    ),
  },
];
export const hempNature = [
  {
    title: text(
      "Урожай за сезон, а не за десятиліття",
      "A crop in a season, rather than decades",
    ),
    body: text(
      "Технічні коноплі — швидкоросла однорічна культура: стеблову сировину отримують за один вегетаційний сезон, тоді як вирощування деревини зазвичай потребує років або десятиліть. Це різні ресурси з різними властивостями. Поле не замінює ліс як екосистему.",
      "Industrial hemp is a fast-growing annual crop: stalk material can be harvested within a growing season, while timber usually takes years or decades to grow. They are different resources with different properties. A field does not replace a forest ecosystem.",
    ),
  },
  {
    title: text(
      "Сівозміна з турботою про ґрунт",
      "Crop rotation that cares for the soil",
    ),
    body: text(
      "Глибоке коріння й щільний покрив можуть підтримувати структуру ґрунту та його захист від ерозії, а включення конопель урізноманітнює сівозміну. Щоб не збіднювати землю, потрібні аналіз ґрунту, збалансоване живлення, повернення органічної речовини та продумане чергування культур. Коноплі також споживають поживні елементи.",
      "Deep roots and dense cover can support soil structure and erosion protection, while hemp diversifies crop rotations. Avoiding soil depletion requires soil testing, balanced nutrition, organic matter return and planned crop sequences. Hemp also takes up nutrients.",
    ),
  },
  {
    title: text(
      "Екологічно чистий продукт — результат відповідального шляху",
      "An environmentally sound product takes a responsible journey",
    ),
    body: text(
      "Для GoldenWood це орієнтир: рослинна сировина з відомим походженням, контрольованою якістю та зрозумілим процесом підготовки. Природне походження саме по собі не гарантує відсутності забруднень або малого впливу. Органічний статус, безпечність і екологічні переваги конкретної партії підтверджуються документами та вимірюваннями.",
      "For GoldenWood, this is an ambition: plant-based materials with known origins, controlled quality and clear preparation processes. Natural origin alone does not establish freedom from contaminants or low impact. Organic status, safety and environmental benefits of a specific batch require documents and measurement.",
    ),
  },
];

export const hempStory = {
  eyebrow: text("ІСТОРІЯ ОДНІЄЇ РОСЛИНИ", "THE STORY OF ONE PLANT"),
  title: text(
    "Нове життя\nзвичайного стебла.",
    "A new life\nfor an ordinary stalk.",
  ),
  paragraphs: [
    text(
      "Уявіть звичайний ранок: ви вдягаєте шкарпетки, берете телефон і сідаєте за стіл. Здається, між цими речами мало спільного. Та в кожної може бути одна рослинна складова — технічні коноплі. Їхній секрет захований у будові: зовні стебла міститься волокно, усередині — деревинна серцевина, а окремий урожай дає насіння. Одна культура відкриває одразу кілька шляхів для майстрів, технологів і виробників.",
      "Imagine an ordinary morning: you put on socks, pick up your phone and sit at a table. These objects seem to have little in common. Yet each could contain the same plant ingredient: industrial hemp. Its possibilities begin with its structure — fiber around the stem, a woody core inside, and a separate harvest of seeds. One crop opens several paths for makers and manufacturers.",
    ),
    text(
      "З волокна починається історія тканини. Його відокремлюють, очищують і готують до прядіння, нерідко поєднуючи з іншими волокнами. Так з’являються нитки для одягу, шкарпеток, домашнього текстилю та міцних полотен. Те саме видовжене волокно може отримати зовсім іншу роль — стати частиною спеціального паперу, мотузки або композитної деталі. Усе вирішує спосіб підготовки.",
      "Fiber begins the story of fabric. It is separated, cleaned and prepared for spinning, often blended with other fibers. The resulting yarn can be used for clothes, socks, home textiles and durable canvas. That same elongated fiber can take a different path into specialty paper, rope or a composite component. Preparation determines which role it can play.",
    ),
    text(
      "Деревинна серцевина стебла теж має свою справу. Після подрібнення й сортування вона стає кострицею — світлими легкими частинками. Разом із відповідним в’яжучим їх використовують у конопляно-вапняних будівельних сумішах. А волокнисті матеріали можуть слугувати утепленням. Так рослина з поля поступово стає частиною будинку: не готовим домом сама по собі, а матеріалом у продуманій конструкції.",
      "The woody core has its own uses. After size reduction and sorting, it becomes hurd: small, pale particles. Combined with a suitable binder, hurd is used in hemp-lime building mixtures, while fibrous materials can provide insulation. A field crop can therefore become part of a home — as a material within an engineered building system.",
    ),
    text(
      "Несподівані зустрічі з коноплями трапляються й у предметному дизайні. Рослинні частинки та волокна вводять у плити й композити для меблевих деталей, автомобільних інтер’єрів або чохлів на телефон. Готовий виріб поєднує кілька складників, тому його властивості залежать від усієї рецептури. Навіть маленький чохол може приховувати довгу історію пошуку потрібної форми, міцності та фактури.",
      "Hemp also makes unexpected appearances in product design. Plant particles and fibers can be incorporated into boards and composites for furniture components, car interiors or phone cases. Each finished object combines several ingredients, so its properties depend on the whole formulation. Even a small phone case can hold a long story of finding the right shape, strength and texture.",
    ),
    text(
      "Поряд із волокном і кострицею є ще один напрям — насіння. З харчових партій отримують очищені ядра, олію, борошно та білкові інгредієнти для випічки, сумішей і рослинних напоїв. Це окремий шлях із власними вимогами до очищення та безпечності. Насіння для сівби має інше призначення: його обирають за сортом, походженням і посівними якостями.",
      "Alongside fiber and hurd is another direction: seed. Food-grade batches can become hulled kernels, oil, flour and protein ingredients for baking, blends and plant-based drinks. This is a separate path with its own cleaning and safety requirements. Sowing seed serves a different purpose and is selected for its variety, origin and planting quality.",
    ),
    text(
      "Можливості цієї рослини особливо цікаві через її швидкий ріст: стебловий урожай отримують за сезон. Але гарна історія починається з уважного ставлення до землі — сівозміни, збалансованого живлення та збереження органічної речовини. І завершується не заміною всього навколо одним матеріалом, а влучним вибором: де коноплі доречні, як підготувати сировину і як створити річ, якою хочеться користуватися довго.",
      "The plant’s fast growth makes these possibilities especially interesting: stalks can be harvested within a season. A good material story still begins with care for the soil through crop rotation, balanced nutrition and organic matter. It leads to thoughtful choices about where hemp fits, how to prepare the material, and how to make something people want to use for a long time.",
    ),
  ],
};
