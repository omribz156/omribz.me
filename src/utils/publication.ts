export type PublicationData = {
  draft?: boolean;
  unlisted?: boolean;
  pubDatetime: Date | string;
};

// Hidden content is not shipped, including direct HTML, Markdown, and image routes.
export function isPublished({ data }: { data: PublicationData }) {
  const date = new Date(data.pubDatetime).getTime();
  return !data.draft && !data.unlisted && Number.isFinite(date) && date <= Date.now();
}
