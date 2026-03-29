import { getPage } from "@/lib/pages";

export const metadata = {
  title: "About Us - DealTop",
  description: "Learn about DealTop and our mission to find the best tech deals.",
};

export default function AboutPage() {
  const page = getPage("about-us");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">About Us</h1>
      {page ? (
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      ) : (
        <div className="text-[var(--muted)]">
          <p>
            DealTop is your go-to destination for finding the best tech deals
            online. We curate products from Amazon to help you find laptops,
            desktops, monitors, and accessories at the best prices.
          </p>
          <p className="mt-4">
            As an Amazon Associate, we earn from qualifying purchases. This
            helps us maintain the site and continue providing great
            recommendations.
          </p>
        </div>
      )}
    </div>
  );
}
