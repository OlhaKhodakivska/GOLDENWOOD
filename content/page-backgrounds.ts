/** Decorative conceptual backgrounds shared by the two locales. */
export const pageBackgrounds = {
  about: "page-about",
  production: "page-production",
  products: "page-materials",
  industries: "page-industries",
  hemp: "page-hemp",
  sustainability: "page-sustainability",
  partners: "page-partners",
  knowledge: "page-knowledge",
  contacts: "page-contacts",
  request: "page-request",
  privacy: "page-contacts",
  terms: "page-contacts",
} as const;
export type PageBackground =
  (typeof pageBackgrounds)[keyof typeof pageBackgrounds];
