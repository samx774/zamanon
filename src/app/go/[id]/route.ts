import { NextRequest, NextResponse } from "next/server";
import products from "@/data/products.json";

// ASINs of the featured "top" products we promote. Each one has a matching
// product page on this site (see src/data/products.json).
const TOP_ASINS = [
  "B0F2GQ8B42",
  "B0F854GHFB",
  "B0CKTM52YC",
  "B0F3Q49M5D",
  "B0F5KTGDS9",
  "B0G7W8XGNC",
  "B0GLFYN4KT",
  "B0DDQXH2GK",
  "B0GR1JTFP8",
  "B0GR14G9PM",
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Random redirect — send the visitor to a random featured PRODUCT PAGE on
  // our own site (not straight to Amazon). They land on our content first and
  // choose to click through from there.
  if (id === "random") {
    const slugs = TOP_ASINS.map(
      (asin) =>
        products.find((p) => p.amazon_link && p.amazon_link.includes(asin))
          ?.slug
    ).filter((s): s is string => Boolean(s));

    const pool = slugs.length ? slugs : products.map((p) => p.slug);
    const slug = pool[Math.floor(Math.random() * pool.length)];
    return NextResponse.redirect(new URL(`/product/${slug}`, request.url), 302);
  }

  // Numbered redirect — /go/1 maps to products[0], etc.
  const index = parseInt(id, 10) - 1;
  if (!isNaN(index) && index >= 0 && index < products.length) {
    return NextResponse.redirect(products[index].amazon_link, 302);
  }

  return new Response("Not Found", { status: 404 });
}
