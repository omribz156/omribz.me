import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import getSortedPosts from "@/utils/getSortedPosts";
import { postMatchesLocale, postSlugForLocale } from "@/utils/postLocale";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog")).filter((post) => postMatchesLocale(post, "he"));
  const sortedPosts = getSortedPosts(posts);

  let markdownContent = `# כל הפוסטים\n\n`;

  if (sortedPosts.length === 0) {
    markdownContent += `בקרוב.\n\n`;
  }

  const postsByYear = sortedPosts.reduce(
    (acc, post) => {
      const year = post.data.pubDatetime.getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, typeof sortedPosts>,
  );

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  for (const year of years) {
    markdownContent += `## ${year}\n\n`;

    for (const post of postsByYear[Number(year)]) {
      const date = post.data.pubDatetime.toLocaleDateString("he-IL", {
        month: "short",
        day: "numeric",
      });
      markdownContent += `- ${date}: [${post.data.title}](/he/posts/${postSlugForLocale(post)}.md)\n`;
    }

    markdownContent += "\n";
  }

  markdownContent += `---\n\n[חזרה לבית](/he/index.md)`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
