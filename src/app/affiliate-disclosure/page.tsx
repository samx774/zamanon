import { getPage } from "@/lib/pages";

export const metadata = {
  title: "Affiliate Disclosure - DealTop",
};

export default function AffiliateDisclosurePage() {
  const page = getPage("affiliate-disclosure");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Affiliate Disclosure</h1>
      {page && (
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      )}
    </div>
  );
}
