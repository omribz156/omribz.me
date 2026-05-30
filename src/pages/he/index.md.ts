import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# עומרי בן צבי

אנליסט אבטחת מידע עם מיקוד באמינות מערכות, תגובה לאירועים והנדסה מונחית סוכנים.

## ניווט

- [אודות](/he/about.md)
- [פוסטים](/he/posts.md)
- [RSS](/rss.xml)

## קישורים

- X: [@omriBzvi](https://x.com/omriBzvi)
- GitHub: [@omribz156](https://github.com/omribz156)
- LinkedIn: [Omri Ben Zvi](https://www.linkedin.com/in/omri-ben-zvi/)
- Email: omribz156@gmail.com

---

*זו גרסת Markdown של omribz.me בעברית.*`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
