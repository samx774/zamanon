import { NextResponse } from "next/server";

export async function GET() {
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="referrer" content="strict-origin">
</head>
<body>
<script>window.location.replace("/go/random")</script>
<noscript><meta http-equiv="refresh" content="0;url=/go/random"></noscript>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
