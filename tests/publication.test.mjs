import test from "node:test";
import assert from "node:assert/strict";
import { isPublished } from "../src/utils/publication.ts";
import { youtubeId, tweetUrl } from "../src/utils/embedUrls.ts";

test("one publication rule excludes hidden, future, invalid dates", () => {
  const data = { pubDatetime: "2026-01-01" };
  assert.equal(isPublished({ data }), true);
  assert.equal([{ data }, { data }].filter(isPublished).length, 2);
  for (const override of [
    { draft: true },
    { unlisted: true },
    { pubDatetime: "2099-01-01" },
    { pubDatetime: "invalid" },
  ]) {
    assert.equal(isPublished({ data: { ...data, ...override } }), false);
  }
});
test("embed URL parser validates exact hosts and IDs", () => {
  assert.equal(youtubeId("abcdefghijk"), "abcdefghijk");
  assert.equal(youtubeId("https://youtu.be/abcdefghijk"), "abcdefghijk");
  assert.equal(youtubeId("https://www.youtube.com/watch?v=abcdefghijk"), "abcdefghijk");
  for (const value of [
    "bad",
    "https://youtube.com.evil.test/watch?v=abcdefghijk",
    "https://evil.test/youtu.be/abcdefghijk",
    "javascript:alert(1)",
    'abcdefghijk" onload="alert(1)',
  ])
    assert.equal(youtubeId(value), null);
  assert.equal(tweetUrl("https://x.com/user/status/123"), "https://twitter.com/user/status/123");
  assert.equal(tweetUrl("https://x.com.evil.test/user/status/123"), null);
});
