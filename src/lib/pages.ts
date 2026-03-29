import pagesData from "@/data/pages.json";

interface PageData {
  title: string;
  content: string;
}

const pages: Record<string, PageData> = pagesData as Record<string, PageData>;

export function getPage(slug: string): PageData | undefined {
  return pages[slug];
}
