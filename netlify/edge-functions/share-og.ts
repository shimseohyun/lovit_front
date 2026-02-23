import type { Context } from "@netlify/edge-functions";

const BOARD_IMAGE_BASE: Record<string, string> = {
  "0": "/assets/result/idol/", // ✅ boardID=0이면 이 폴더에서 찾는다
  // "1": "/assets/result/girl/",
};

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isSafeFileName(name: string) {
  // ✅ ../ 방지 + 너무 자유롭게 열어두지 않기
  return /^[A-Za-z0-9_.-]+\.(png|jpg|jpeg|webp)$/i.test(name);
}

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const segs = url.pathname.replace(/^\/+|\/+$/g, "").split("/"); // ["share","0","START_START.png"]

  const shareRoot = (segs[0] ?? "").toLowerCase();
  const boardID = segs[1] ?? "";
  const fileName = decodeURIComponent(segs[2] ?? "");

  if (shareRoot !== "share") return new Response("Not Found", { status: 404 });
  if (!BOARD_IMAGE_BASE[boardID])
    return new Response("Not Found", { status: 404 });
  if (!fileName || !isSafeFileName(fileName))
    return new Response("Bad Request", { status: 400 });

  const imgPath = `${BOARD_IMAGE_BASE[boardID]}${fileName}`;
  const ogImage = new URL(imgPath, url.origin).toString();

  const title = "러빗 결과";
  const desc = "러빗과 함께 나의 취향 사분면을 찾아보세요";

  const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />

<meta property="og:type" content="website" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(desc)}" />
<meta property="og:image" content="${escapeHtml(ogImage)}" />
<meta property="og:url" content="${escapeHtml(url.toString())}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(desc)}" />
<meta name="twitter:image" content="${escapeHtml(ogImage)}" />

<title>${escapeHtml(title)}</title>
</head>
<body></body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
};
