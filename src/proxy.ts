import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isInternalReferer(referer: string | null, host: string): boolean {
  if (!referer) return false;
  try {
    const refHost = new URL(referer).hostname;
    return (
      refHost === host ||
      refHost.endsWith("." + host) ||
      refHost === "localhost" ||
      refHost.startsWith("localhost")
    );
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const referer = request.headers.get("referer");
  const host = request.headers.get("host") || "";
  // Strip port for comparison
  const hostname = host.split(":")[0];
  const internal = isInternalReferer(referer, hostname);

  // ── Strip tracking query params (utm, fbclid, gclid, _ga) ──
  const trackingParams = ["fbclid", "gclid", "_ga"];
  const utmKeys = [...searchParams.keys()].filter((k) => k.startsWith("utm"));
  const paramsToRemove = [
    ...trackingParams.filter((p) => searchParams.has(p)),
    ...utmKeys,
  ];

  if (paramsToRemove.length > 0) {
    const url = request.nextUrl.clone();
    paramsToRemove.forEach((p) => url.searchParams.delete(p));
    return NextResponse.redirect(url, 301);
  }

  // ── Protect /go/* routes ──
  // Block direct access (no referrer) and external referrers
  if (pathname.startsWith("/go/")) {
    if (!referer || !internal) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  // ── Referrer washing for /lp/first ──
  // External referrer without ?ok=1 → self-redirect to strip the referrer
  if (pathname === "/lp/first") {
    if (referer && !internal) {
      const ok = searchParams.get("ok");
      if (ok !== "1") {
        const url = request.nextUrl.clone();
        url.searchParams.set("ok", "1");
        return NextResponse.redirect(url, 302);
      }
    }
  }

  // ── middle page: only empty referrer allowed ──
  // htaccess: if referrer is NOT empty → redirect to /lp/first
  if (pathname === "/lp/middle") {
    if (referer) {
      return NextResponse.redirect(new URL("/lp/first", request.url), 302);
    }
  }

  // ── Security headers on all responses ──
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Content-Security-Policy", "frame-ancestors 'none';");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // noindex/nofollow for funnel & redirect routes
  if (pathname.startsWith("/lp/") || pathname.startsWith("/go/")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  // Referrer-Policy: no-referrer for LP pages (referrer wash)
  if (pathname.startsWith("/lp/")) {
    response.headers.set("Referrer-Policy", "strict-origin");
  } else {
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)",
  ],
};
