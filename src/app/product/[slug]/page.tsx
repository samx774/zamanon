import { getAllProducts, getProductBySlug } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import RelatedProducts from "@/components/RelatedProducts";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.title} - Zamanon`,
    description: product.excerpt,
    openGraph: {
      title: product.title,
      description: product.excerpt,
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--foreground)]">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-[var(--foreground)] capitalize"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="truncate max-w-xs">{product.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="bg-white rounded-lg border border-[var(--border)] flex items-center justify-center p-8">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="object-contain max-h-[400px]"
                  priority
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <span className="inline-block text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 capitalize mb-3">
                {product.category}
              </span>
              <h1 className="text-2xl font-bold leading-tight">
                {product.title}
              </h1>

              <p className="mt-4 text-[var(--muted)] leading-relaxed">
                {product.excerpt}
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={product.amazon_link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="block w-full text-center bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-semibold py-3 px-6 rounded-lg transition-colors text-lg"
                >
                  Check Price on Amazon
                </a>
                <p className="text-xs text-[var(--muted)] text-center">
                  As an Amazon Associate, we earn from qualifying purchases.
                </p>
              </div>

              {product.description && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold mb-3">Description</h2>
                  <div className="text-sm text-[var(--muted)] leading-relaxed whitespace-pre-line">
                    {product.description}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts
            currentSlug={product.slug}
            category={product.category}
          />
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
