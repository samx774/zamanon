import Link from "next/link";
import { getCategories, getAllProducts } from "@/lib/products";

export default function Sidebar() {
  const categories = getCategories();
  const recentProducts = getAllProducts().slice(0, 5);

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-8">
      {/* Search */}
      <div className="border border-[var(--border)] rounded-lg p-4">
        <h3 className="font-semibold mb-3">Search</h3>
        <form action="/search" method="GET">
          <input
            type="text"
            name="q"
            placeholder="Search products..."
            className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--card)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </form>
      </div>

      {/* Recent Products */}
      <div className="border border-[var(--border)] rounded-lg p-4">
        <h3 className="font-semibold mb-3">Recent Products</h3>
        <ul className="space-y-2">
          {recentProducts.map((product) => (
            <li key={product.slug}>
              <Link
                href={`/product/${product.slug}`}
                className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] line-clamp-2 block"
              >
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div className="border border-[var(--border)] rounded-lg p-4">
        <h3 className="font-semibold mb-3">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/category/${cat.slug}`}
                className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] flex justify-between"
              >
                <span className="capitalize">{cat.name}</span>
                <span>({cat.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
