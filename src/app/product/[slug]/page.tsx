import { getAllProducts, getProductBySlug } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import RelatedProducts from "@/components/RelatedProducts";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/site";

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
    title: `${product.title} - ZamTech`,
    description: product.excerpt,
    keywords: [product.category, "amazon deal", "best price", SITE_NAME],
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      type: "website",
      title: product.title,
      description: product.excerpt,
      url: `${SITE_URL}/product/${product.slug}`,
      images: product.image ? [product.image] : [],
    },
    twitter: {
      card: "summary_large_image",
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
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.excerpt || product.description,
            category: product.category,
            sku: product.slug,
            url: `${SITE_URL}/product/${product.slug}`,
            ...(product.image ? { image: [product.image] } : {}),
          },
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
                name: product.category,
                item: `${SITE_URL}/category/${product.category}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: product.title,
              },
            ],
          },
        ]}
      />
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
              <span className="eyebrow text-[var(--muted)] capitalize">
                {product.category}
              </span>
              <h1 className="font-display mt-3 text-2xl md:text-3xl font-bold leading-tight">
                {product.title}
              </h1>

              <p className="mt-4 text-[var(--muted)] leading-relaxed">
                {product.excerpt}
              </p>

              <div className="mt-7 space-y-3">
                <a
                  href={product.amazon_link}
                  target="_blank"
                  rel="noopener nofollow"
                  className="flex items-center justify-center gap-2 w-full text-center bg-[var(--foreground)] hover:bg-[var(--muted)] text-[var(--background)] font-medium uppercase tracking-[0.1em] text-sm py-4 px-6 transition-colors"
                >
                  Check Price on Amazon
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8m9 0v9" />
                  </svg>
                </a>
                <p className="text-xs text-[var(--muted)] text-center">
                  As an Amazon Associate, we earn from qualifying purchases.
                </p>
              </div>

              {product.description && (
                <div className="mt-8">
                  <h2 className="font-display text-lg font-semibold mb-3">Description</h2>
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
