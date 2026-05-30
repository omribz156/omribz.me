import type { CollectionEntry } from "astro:content";
import type { Locale } from "./i18n";

export function postMatchesLocale(post: CollectionEntry<"blog">, locale: Locale) {
  return (post.data.lang ?? "en") === locale;
}

export function postSlugForLocale(post: CollectionEntry<"blog">) {
  return post.id.replace(/^(en|he)\//, "");
}
