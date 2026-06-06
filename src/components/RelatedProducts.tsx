import ProductCard from "./ProductCard";
import { getProductsByCategory } from "@/lib/products";
import type { Product } from "@/lib/products";

interface RelatedProductsProps {
  currentSlug: string;
  category: string;
}

export default function RelatedProducts({
  currentSlug,
  category,
}: RelatedProductsProps) {
  const related = getProductsByCategory(category)
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 border-t border-[var(--border)] pt-8">
      <h2 className="font-display text-xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
