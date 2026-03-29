import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // --- Strip tracking query params (utm, fbclid, gclid, _ga) ---
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

  // --- Referrer protection on /go/ routes ---
  if (pathname.startsWith("/go/")) {
    const referer = request.headers.get("referer");
    const allowedHost = "the-paramedics.org";

    // Block if no referrer (direct access)
    if (!referer) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Block if referrer is from external site
    try {
      const refUrl = new URL(referer);
      if (
        !refUrl.hostname.endsWith(allowedHost) &&
        refUrl.hostname !== "localhost" &&
        !refUrl.hostname.startsWith("localhost")
      ) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    } catch {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  // --- Security headers on all responses ---
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set(
    "Content-Security-Policy",
    "frame-ancestors 'none';"
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // Referrer-Policy: no-referrer for landing pages (referrer wash)
  if (pathname === "/lp" || pathname === "/lp/first") {
    response.headers.set("Referrer-Policy", "no-referrer");
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and images
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
