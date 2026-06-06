import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import { getAllProducts, getCategories } from "@/lib/products";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const products = getAllProducts();
  const categories = getCategories();
  const featured = products.slice(0, 12);
  const heroProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero — brand statement first, products in a supporting strip */}
      <Hero products={heroProducts} />

      {/* Stats */}
      <section className="bg-[var(--foreground)] text-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: `${products.length}+`, label: "Products" },
              { value: categories.length, label: "Categories" },
              { value: "Daily", label: "Updated" },
              { value: "Amazon", label: "Verified Deals" },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-8 text-center">
                <div className="font-display text-2xl md:text-3xl font-bold">
                  {stat.value}
                </div>
                <div className="eyebrow mt-2 text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        id="products"
        className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20"
      >
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow text-[var(--muted)]">The Latest</p>
            <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/category/laptops"
            className="hidden sm:inline-flex items-center gap-2 text-[0.8125rem] font-medium uppercase tracking-[0.12em] hover:text-[var(--muted)] transition-colors"
          >
            View all
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-[var(--border)] bg-[var(--card)] py-16 md:py-20 grid-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="eyebrow text-[var(--muted)]">Explore</p>
            <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold">
              Browse by Category
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)]">
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group relative bg-[var(--background)] p-8 transition-colors hover:bg-[var(--foreground)]"
              >
                <span className="eyebrow text-[var(--muted)] group-hover:text-white/50 transition-colors">
                  0{i + 1}
                </span>
                <h3 className="font-display mt-6 text-xl font-semibold capitalize group-hover:text-[var(--background)] transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)] group-hover:text-white/60 transition-colors">
                  {cat.count} products
                </p>
                <span className="absolute right-7 top-8 text-[var(--muted)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[var(--background)] transition-all duration-300" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
