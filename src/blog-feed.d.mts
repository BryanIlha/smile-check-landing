export type BlogArticle = { id: string; products: string[]; kind: "news" | "patch-notes"; title: string; summary: string; date: string; status: string; availabilityNote: string; url: string };
export function parseBlogFeed(value: unknown, product: string): BlogArticle[];
