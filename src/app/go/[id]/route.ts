import { NextRequest, NextResponse } from "next/server";
import products from "@/data/products.json";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Random redirect — pick a random product from products.json
  if (id === "random") {
    const index = Math.floor(Math.random() * products.length);
    return NextResponse.redirect(products[index].amazon_link, 302);
  }

  // Numbered redirect — /go/1 maps to products[0], etc.
  const index = parseInt(id, 10) - 1;
  if (!isNaN(index) && index >= 0 && index < products.length) {
    return NextResponse.redirect(products[index].amazon_link, 302);
  }

  return new Response("Not Found", { status: 404 });
}
