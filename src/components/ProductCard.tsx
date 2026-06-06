import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col border border-[var(--border)] bg-[var(--background)] overflow-hidden transition-all duration-300 hover:border-[var(--foreground)] hover:shadow-[0_18px_40px_-24px_rgba(10,10,10,0.45)]">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square bg-white flex items-center justify-center overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="w-full h-full bg-[var(--card)] flex items-center justify-center text-[var(--muted)] text-sm">
              No Image
            </div>
          )}
          <span className="absolute left-3 top-3 eyebrow text-[var(--muted)] bg-[var(--background)]/80 backdrop-blur px-2 py-1 capitalize">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/product/${product.slug}`} className="flex-1">
          <h3 className="text-sm font-medium leading-snug line-clamp-2 transition-colors group-hover:text-[var(--muted)]">
            {product.title}
          </h3>
        </Link>

        <a
          href={product.amazon_link}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-4 inline-flex items-center justify-center gap-2 w-full text-center bg-[var(--foreground)] text-[var(--background)] text-[0.8125rem] font-medium uppercase tracking-[0.1em] py-3 px-4 transition-colors hover:bg-[var(--muted)]"
        >
          View on Amazon
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17L17 7M17 7H8m9 0v9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
