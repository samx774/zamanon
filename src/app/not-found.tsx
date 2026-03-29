import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-6xl font-bold text-[var(--primary)]">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-[var(--muted)]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/"
          className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/category/laptops"
          className="border border-[var(--border)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--card)] transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
