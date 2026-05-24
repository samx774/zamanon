import { NextRequest, NextResponse } from "next/server";
import products from "@/data/products.json";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Random redirect — pick from top high-value products only
  if (id === "random") {
    const topProducts = [
      "https://amazon.com/dp/B0F2GQ8B42?tag=samjr-20",
      "https://amazon.com/dp/B0DZD91W4F?tag=samjr-20",
      "https://amazon.com/dp/B0F854GHFB?tag=samjr-20",
      "https://amazon.com/dp/B0CKTM52YC?tag=samjr-20",
      "https://amazon.com/dp/B0F3Q49M5D?tag=samjr-20",
      "https://amazon.com/dp/B0F5KTGDS9?tag=samjr-20",
      "https://amazon.com/dp/B0G7W8XGNC?tag=samjr-20",
      "https://amazon.com/dp/B0GLFYN4KT?tag=samjr-20",
      "https://amazon.com/dp/B0DDQXH2GK?tag=samjr-20",
    ];
    const index = Math.floor(Math.random() * topProducts.length);
    return NextResponse.redirect(topProducts[index], 302);
  }

  // Numbered redirect — /go/1 maps to products[0], etc.
  const index = parseInt(id, 10) - 1;
  if (!isNaN(index) && index >= 0 && index < products.length) {
    return NextResponse.redirect(products[index].amazon_link, 302);
  }

  return new Response("Not Found", { status: 404 });
}
