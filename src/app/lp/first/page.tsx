"use client";

import { useEffect } from "react";

export default function FirstLP() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const step = parseInt(params.get("step") || "0");
    const origin = window.location.origin;

    if (step === 0) {
      window.location.replace(origin + "/lp/first?step=1");
    } else if (step === 1) {
      const link = document.createElement("a");
      link.href = origin + "/lp/first?step=2";
      link.click();
    } else if (step === 2) {
      history.pushState({}, "", "/lp/first");
      const link = document.createElement("a");
      link.href = origin + "/lp/middle";
      link.click();
    }
  }, []);

  return (
    <html>
      <head>
        <meta name="referrer" content="no-referrer" />
      </head>
      <body>
        <p style={{ color: "#999", textAlign: "center", marginTop: "40vh" }}>
          Redirecting...
        </p>
      </body>
    </html>
  );
}
