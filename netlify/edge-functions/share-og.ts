import type { Context } from "@netlify/edge-functions";

const BOARD_IMAGE_BASE: Record<string, string> = {
  "0": "/assets/result/idol/",
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

/**
 * ENDEND -> END_END.png
 * STARTMIDDLE -> START_MIDDLE.png
 * MIDDLEMIDDLE0 -> MIDDLE_MIDDLE_0.png
 */
function codeToFileName(codeRaw: string) {
  const code = codeRaw
    .split("?")[0]
    .split("#")[0]
    .replace(/\.(png|jpg|jpeg|webp)$/i, "") // 혹시 .png 붙어와도 제거
    .toUpperCase();

  // (START|MIDDLE|END)(START|MIDDLE|END)(optional digits)
  const m = code.match(/^(START|MIDDLE|END)(START|MIDDLE|END)(\d+)?$/);
  if (!m) return null;

  const a = m[1];
  const b = m[2];
  const n = m[3]; // "0" | "1" | undefined

  return n ? `${a}_${b}_${n}.png` : `${a}_${b}.png`;
}

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const segs = url.pathname.replace(/^\/+|\/+$/g, "").split("/"); // ["share","0","ENDEND"]

  const shareRoot = (segs[0] ?? "").toLowerCase();
  const boardID = segs[1] ?? "";
  const codeOrName = decodeURIComponent(segs[2] ?? "");

  if (shareRoot !== "share") return new Response("Not Found", { status: 404 });
  if (!BOARD_IMAGE_BASE[boardID])
    return new Response("Not Found", { status: 404 });
  if (!codeOrName) return new Response("Bad Request", { status: 400 });

  const fileName = codeToFileName(codeOrName);
  if (!fileName) return new Response("Bad Request", { status: 400 });

  const imgPath = `${BOARD_IMAGE_BASE[boardID]}${fileName}`;
  const ogImage = new URL(imgPath, url.origin).toString();

  const title = "lovt";
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
