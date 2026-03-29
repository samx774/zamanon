import { getPage } from "@/lib/pages";

export const metadata = {
  title: "Privacy Policy - DealTop",
};

export default function PrivacyPolicyPage() {
  const page = getPage("privacy-policy-2");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      {page && (
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      )}
    </div>
  );
}
