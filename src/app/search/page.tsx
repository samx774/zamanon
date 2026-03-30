import ProductCard from "@/components/ProductCard";
import { searchProducts, getAllProducts } from "@/lib/products";

export const metadata = {
  title: "Search - Zamanon",
  description: "Search for tech products and deals.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";
  const results = query ? searchProducts(query) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-2">Search Results</h1>
      {query && (
        <p className="text-[var(--muted)] mb-6">
          {results.length} results for &quot;{query}&quot;
        </p>
      )}

      {!query && (
        <p className="text-[var(--muted)] mb-6">
          Enter a search term to find products.
        </p>
      )}

      {query && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-[var(--muted)]">
            No products found for &quot;{query}&quot;
          </p>
          <p className="text-sm text-[var(--muted)] mt-2">
            Try different keywords or browse our categories.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
