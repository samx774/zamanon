"use client";

import { useEffect } from "react";

export default function MiddlePage() {
  useEffect(() => {
    window.location.replace(window.location.origin + "/lp/landing");
  }, []);

  return (
    <html>
      <head />
      <body>
        <p style={{ color: "#999", textAlign: "center", marginTop: "40vh" }}>
          Redirecting...
        </p>
      </body>
    </html>
  );
}
