import { getCollection } from "astro:content";
import readingTime from "reading-time";
import type { Locale } from "./i18n";

export function calculateReadingTime(content: string, locale: Locale = "en"): string {
  const stats = readingTime(content);
  const minutes = Math.ceil(stats.minutes);
  if (locale === "he") {
    return minutes === 1 ? "דקת קריאה" : `${minutes} דקות קריאה`;
  }
  return `${minutes} min read`;
}

export async function getReadingTime(postId: string): Promise<string> {
  const posts = await getCollection("blog");
  const post = posts.find((p) => p.id === postId);

  if (!post || !post.body) {
    return "5 min read"; // fallback
  }

  return calculateReadingTime(post.body, post.data.lang);
}
