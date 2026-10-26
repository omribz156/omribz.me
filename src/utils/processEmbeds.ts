import { tweetUrl, youtubeId } from "./embedUrls";

export function processEmbeds(root: ParentNode = document) {
  root.querySelectorAll("#article p, .mdx-content p").forEach((paragraph) => {
    // Only a standalone text shortcode is executable; code examples remain text.
    if (paragraph.closest("pre, code") || paragraph.children.length) return;
    const match = paragraph.textContent?.trim().match(/^\{% (youtube|twitter) (\S+) %\}$/);
    if (!match) return;
    const container = document.createElement("div");
    if (match[1] === "youtube") {
      const id = youtubeId(match[2]);
      if (!id) return;
      container.className = "youtube-embed-container";
      container.style.cssText = "aspect-ratio:16/9;width:100%;margin:2rem 0";
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}`;
      iframe.title = "YouTube video player";
      iframe.loading = "lazy";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.style.cssText = "width:100%;height:100%;border:0";
      container.append(iframe);
    } else {
      const url = tweetUrl(match[2]);
      if (!url) return;
      const quote = document.createElement("blockquote");
      quote.className = "twitter-tweet";
      const link = document.createElement("a");
      link.href = url;
      link.textContent = "View post on X";
      quote.append(link);
      container.append(quote);
    }
    paragraph.replaceWith(container);
  });
  if (!root.querySelector("blockquote.twitter-tweet")) return;
  if (window.twttr?.widgets) {
    window.twttr.widgets.load();
  } else if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.head.append(script);
  }
}
