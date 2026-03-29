import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

const amazonRedirects: Record<string, string> = {
  "1": "https://www.amazon.com/dp/B0947BJ67M?tag=a7medtamer-20",
  "2": "https://www.amazon.com/dp/B0GJK46PVZ?tag=a7medtamer-20",
  "3": "https://www.amazon.com/dp/B0DZD9S5GC?tag=a7medtamer-20",
  "4": "https://www.amazon.com/dp/B0F854GHFB?tag=a7medtamer-20",
  "5": "https://www.amazon.com/dp/B08YKGZF7P?tag=a7medtamer-20",
  "6": "https://www.amazon.com/dp/B0F5KTGDS9?tag=a7medtamer-20",
  "7": "https://www.amazon.com/dp/B0FWD623D1?tag=a7medtamer-20",
  "8": "https://www.amazon.com/dp/B089QV23YJ?tag=a7medtamer-20",
  "9": "https://www.amazon.com/dp/B07C8ZVT6D?tag=a7medtamer-20",
  "10": "https://www.amazon.com/dp/B09R6FNNS1?tag=a7medtamer-20",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = amazonRedirects[id];

  if (url) {
    redirect(url);
  }

  return new Response("Not Found", { status: 404 });
}
