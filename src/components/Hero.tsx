import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function Hero({ products }: { products: Product[] }) {
  return (
    <section className="relative border-b border-[var(--border)] bg-[var(--background)] grid-texture overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        {/* Brand statement */}
        <div className="max-w-3xl animate-fade-up">
          <p className="eyebrow text-[var(--muted)] flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[var(--foreground)]" />
            Curated Tech · Best Prices on Amazon
          </p>
          <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.02] tracking-tight text-balance">
            The best tech,
            <br />
            without the guesswork
            <span className="text-[var(--muted)]">.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-xl">
            Hand-picked laptops, desktops, monitors and accessories — the
            sharpest deals on Amazon, curated so you never have to dig or
            overpay.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="#products"
              className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] text-[0.8125rem] font-medium uppercase tracking-[0.1em] py-3.5 px-7 transition-colors hover:bg-[var(--muted)]"
            >
              Browse products
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-6-6m6 6l6-6" />
              </svg>
            </Link>
            <Link
              href="/category/laptops"
              className="inline-flex items-center gap-2 text-[0.8125rem] font-medium uppercase tracking-[0.1em] py-3.5 px-7 border border-[var(--border)] hover:border-[var(--foreground)] transition-colors"
            >
              Shop laptops
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Featured strip — products in a supporting role */}
        {products.length > 0 && (
          <div className="mt-14 md:mt-20 pt-8 border-t border-[var(--border)]">
            <div className="flex items-baseline justify-between mb-6">
              <p className="eyebrow text-[var(--muted)]">Featured</p>
              <Link
                href="#products"
                className="text-xs uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                See all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
              {products.map((product, i) => (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="group flex items-center gap-4 bg-[var(--background)] p-4 transition-colors hover:bg-[var(--card)]"
                >
                  <div className="relative w-16 h-16 shrink-0 bg-white border border-[var(--border)] flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={64}
                        height={64}
                        className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-[10px] text-[var(--muted)]">N/A</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="eyebrow text-[var(--muted)] capitalize">
                      0{i + 1} · {product.category}
                    </span>
                    <h3 className="mt-1.5 text-sm font-medium leading-snug line-clamp-2 group-hover:underline underline-offset-4 decoration-1">
                      {product.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
