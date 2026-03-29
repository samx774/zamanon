"use client";

import { useEffect } from "react";

const PATHS = [
  "/go/1",
  "/go/2",
  "/go/3",
  "/go/4",
  "/go/5",
  "/go/6",
  "/go/7",
  "/go/8",
  "/go/9",
];

function pickIndex(): number {
  try {
    const key = "rr_idx_v6";
    const next =
      (parseInt(localStorage.getItem(key) || "0", 10) || 0) + 1;
    localStorage.setItem(key, String(next));
    return (next - 1) % PATHS.length;
  } catch {
    return Math.floor(Math.random() * PATHS.length);
  }
}

export default function LandingPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const force = params.get("force");
    let idx: number;

    if (force !== null && /^\d$/.test(force)) {
      idx = parseInt(force) % PATHS.length;
    } else {
      idx = pickIndex();
    }

    window.location.replace(PATHS[idx]);
  }, []);

  return (
    <html>
      <head>
        <meta name="referrer" content="strict-origin" />
      </head>
      <body>
        <p style={{ color: "#999", textAlign: "center", marginTop: "40vh" }}>
          Redirecting...
        </p>
      </body>
    </html>
  );
}
