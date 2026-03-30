import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group border border-[var(--border)] rounded-lg overflow-hidden bg-[var(--card)] hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square bg-white flex items-center justify-center overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              className="object-contain p-4 group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium line-clamp-2 hover:text-[var(--primary)] transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="inline-block text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 capitalize">
            {product.category}
          </span>
        </div>

        <a
          href={product.amazon_link}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-3 block w-full text-center bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white text-sm font-medium py-2 px-4 rounded transition-colors"
        >
          View on Amazon
        </a>
      </div>
    </div>
  );
}
