import productsData from "@/data/products.json";

export interface Product {
  title: string;
  slug: string;
  date: string;
  image: string;
  amazon_link: string;
  excerpt: string;
  description: string;
  category: string;
}

const products: Product[] = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCategories(): { name: string; count: number; slug: string }[] {
  const counts: Record<string, number> = {};
  for (const p of products) {
    counts[p.category] = (counts[p.category] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count, slug: name }))
    .sort((a, b) => b.count - a.count);
}

export function searchProducts(query: string): Product[] {
  const lower = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.excerpt.toLowerCase().includes(lower)
  );
}
