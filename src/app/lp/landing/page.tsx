"use client";

import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    window.location.replace("/go/random");
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
