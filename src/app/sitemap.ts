import type { MetadataRoute } from "next";
import { getAllProducts, getCategories } from "@/lib/products";

const BASE_URL = "https://zamanon.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();
  const categories = getCategories();

  const staticPages = [
    "",
    "/about",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
    "/affiliate-disclosure",
    "/cookies-policy",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1.0 : 0.5,
  }));

  const categoryPages = categories.map((cat) => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productPages = products.map((product) => ({
    url: `${BASE_URL}/product/${product.slug}`,
    lastModified: new Date(product.date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
