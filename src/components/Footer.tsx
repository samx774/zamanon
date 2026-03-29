import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-[var(--primary)]">
              DealTop
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Curated deals on the latest tech products. We help you find the
              best prices on laptops, desktops, monitors, and more.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Categories
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/category/laptops"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  Laptops
                </Link>
              </li>
              <li>
                <Link
                  href="/category/desktops"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  Desktops
                </Link>
              </li>
              <li>
                <Link
                  href="/category/monitors"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  Monitors
                </Link>
              </li>
              <li>
                <Link
                  href="/category/accessories"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Legal
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate-disclosure"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies-policy"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  Cookies Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border)] text-center">
          <p className="text-sm text-[var(--muted)]">
            &copy; {new Date().getFullYear()} DealTop. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted)] mt-1">
            As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
}
