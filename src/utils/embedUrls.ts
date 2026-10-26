export function youtubeId(input: string): string | null {
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  try {
    const url = new URL(input);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
    let id: string | null = null;
    if (url.hostname === "youtu.be") id = url.pathname.slice(1);
    if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)) {
      id =
        url.pathname === "/watch"
          ? url.searchParams.get("v")
          : (url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)$/)?.[1] ?? null);
    }
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function tweetUrl(input: string): string | null {
  try {
    const url = new URL(input);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.port ||
      !["twitter.com", "www.twitter.com", "x.com", "www.x.com"].includes(url.hostname) ||
      !/^\/[A-Za-z0-9_]+\/status\/\d+$/.test(url.pathname)
    )
      return null;
    return `https://twitter.com${url.pathname}`;
  } catch {
    return null;
  }
}
