import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { postMatchesLocale, postSlugForLocale } from "@/utils/postLocale";

export async function getStaticPaths() {
  const posts = (
    await getCollection("blog", ({ data }) => import.meta.env.DEV || !data.draft)
  ).filter((post) => postMatchesLocale(post, "he"));

  return posts.map((post) => ({
    params: { slug: postSlugForLocale(post) },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<"blog"> };

  return new Response(post.body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
