import Link from "next/link";
import Image from "next/image";

const categoryLinks = [
  { name: "Laptops", href: "/category/laptops" },
  { name: "Desktops", href: "/category/desktops" },
  { name: "Monitors", href: "/category/monitors" },
  { name: "Accessories", href: "/category/accessories" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { name: "Cookies Policy", href: "/cookies-policy" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="max-w-xs">
            {/* Logo is black-on-white; invert renders it white-on-black to suit the dark footer */}
            <Image
              src="/logo.png"
              alt="Zamanon"
              width={1417}
              height={501}
              className="h-9 w-auto invert"
            />
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              Curated deals on the latest tech products. We help you find the
              best prices on laptops, desktops, monitors, and more.
            </p>
          </div>

          <div>
            <h4 className="eyebrow text-white/40">Categories</h4>
            <ul className="mt-4 space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-white/40">Legal</h4>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Zamanon. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
}
