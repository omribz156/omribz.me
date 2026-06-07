import { type CollectionEntry, getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { SITE } from "@/config";
import { generateOgImageForPost } from "@/utils/generateOgImages";
import { postMatchesLocale, postSlugForLocale } from "@/utils/postLocale";

export async function getStaticPaths() {
  if (!SITE.dynamicOgImage) {
    return [];
  }

  const posts = await getCollection("blog").then((p) =>
    p.filter((post) => postMatchesLocale(post, "he") && !post.data.draft && !post.data.ogImage),
  );

  return posts.map((post) => ({
    params: { slug: postSlugForLocale(post) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  if (!SITE.dynamicOgImage) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  const png = await generateOgImageForPost(props as CollectionEntry<"blog">);
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
