import { getPage } from "@/lib/pages";

export const metadata = {
  title: "Terms and Conditions - Zamanon",
};

export default function TermsPage() {
  const page = getPage("terms-and-conditions");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
      {page && (
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      )}
    </div>
  );
}
