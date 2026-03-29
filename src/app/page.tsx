import ProductCard from "@/components/ProductCard";
import { getAllProducts, getCategories } from "@/lib/products";
import Link from "next/link";

export default function Home() {
  const products = getAllProducts();
  const categories = getCategories();
  const featured = products.slice(0, 12);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">
            Find the Best Tech Deals
          </h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl">
            Curated selection of laptops, desktops, monitors, and accessories at
            the best prices on Amazon.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                <span className="capitalize">{cat.name}</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[var(--primary)]">
                {products.length}+
              </div>
              <div className="text-sm text-[var(--muted)]">Products</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--primary)]">
                {categories.length}
              </div>
              <div className="text-sm text-[var(--muted)]">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--primary)]">
                Daily
              </div>
              <div className="text-sm text-[var(--muted)]">Updated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--primary)]">
                Amazon
              </div>
              <div className="text-sm text-[var(--muted)]">Verified Deals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Latest Products</h2>
          <Link
            href="/category/laptops"
            className="text-sm text-[var(--primary)] hover:underline"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-[var(--card)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="border border-[var(--border)] rounded-lg p-6 bg-white dark:bg-[#141414] hover:shadow-md transition-shadow text-center"
              >
                <h3 className="text-lg font-semibold capitalize">{cat.name}</h3>
                <p className="text-sm text-[var(--muted)] mt-1">
                  {cat.count} products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
