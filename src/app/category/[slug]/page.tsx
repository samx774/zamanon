import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import {
  getProductsByCategory,
  getCategories,
  getAllProducts,
} from "@/lib/products";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

const PRODUCTS_PER_PAGE = 24;

export function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: category } = await params;
  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} - Zamanon`,
    description: `Browse the best ${category} deals on Amazon. Curated selection at the best prices.`,
    alternates: { canonical: `/category/${category}` },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug: category } = await params;
  const { page: pageParam } = await searchParams;
  const validCategories = getCategories().map((c) => c.slug);

  if (!validCategories.includes(category)) {
    notFound();
  }

  const allProducts =
    category === "all"
      ? getAllProducts()
      : getProductsByCategory(category);
  const categories = getCategories();

  const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);
  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const products = allProducts.slice(start, start + PRODUCTS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${SITE_URL}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: category,
                item: `${SITE_URL}/category/${category}`,
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${category} products`,
            numberOfItems: allProducts.length,
            itemListElement: products.map((p, i) => ({
              "@type": "ListItem",
              position: start + i + 1,
              url: `${SITE_URL}/product/${p.slug}`,
              name: p.title,
            })),
          },
        ]}
      />
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--foreground)]">
          Home
        </Link>
        <span>/</span>
        <span className="capitalize">{category}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-48 shrink-0">
          <h3 className="font-semibold mb-3">Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className={`text-sm flex justify-between ${
                    cat.slug === category
                      ? "text-[var(--primary)] font-medium"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <span className="capitalize">{cat.name}</span>
                  <span>({cat.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-display text-2xl md:text-3xl font-bold capitalize">{category}</h1>
            <span className="text-sm text-[var(--muted)]">
              {allProducts.length} products
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/category/${category}`}
          />
        </div>
      </div>
    </div>
  );
}
