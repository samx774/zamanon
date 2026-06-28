import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZamTech - Latest Products & Best Deals",
    short_name: "ZamTech",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
  };
}
