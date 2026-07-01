"use client";

import { useEffect } from "react";

export default function ProductRedirect({ amazonLink }: { amazonLink: string }) {
  useEffect(() => {
    if (amazonLink) {
      window.location.href = amazonLink;
    }
  }, [amazonLink]);

  return null;
}
