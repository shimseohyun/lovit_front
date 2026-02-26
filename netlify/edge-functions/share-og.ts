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
 * ENDEND -> END_END.jpg
 * STARTMIDDLE -> START_MIDDLE.jpg
 * MIDDLEMIDDLE0 -> MIDDLE_MIDDLE_0.jpg
 */
function codeToFileName(codeRaw: string) {
  const code = codeRaw
    .split("?")[0]
    .split("#")[0]
    .replace(/\.(png|jpg|jpeg|webp)$/i, "")
    .toUpperCase();

  const m = code.match(/^(START|MIDDLE|END)(START|MIDDLE|END)(\d+)?$/);
  if (!m) return null;

  const a = m[1];
  const b = m[2];
  const n = m[3];

  return n ? `${a}_${b}_${n}.jpg` : `${a}_${b}.jpg`;
}

function isOgBot(uaRaw: string) {
  const ua = (uaRaw ?? "").toLowerCase();

  return (
    // ✅ 카카오 스크랩봇 (정확히)
    ua.includes("kakaotalk-scrap") ||
    // ✅ 카카오 스크랩봇 UA에 같이 붙는 경우가 많음
    ua.includes("facebookexternalhit") ||
    // 기타 스크래퍼
    ua.includes("facebot") ||
    ua.includes("twitterbot") ||
    ua.includes("slackbot") ||
    ua.includes("discordbot") ||
    ua.includes("telegrambot") ||
    // 검색봇
    ua.includes("googlebot") ||
    ua.includes("bingbot")
  );
}

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const ua = req.headers.get("user-agent") ?? "";
  const bot = isOgBot(ua);

  const segs = url.pathname.replace(/^\/+|\/+$/g, "").split("/"); // ["share","0","ENDEND"]
  const shareRoot = (segs[0] ?? "").toLowerCase();
  const boardID = segs[1] ?? "";
  const codeOrName = decodeURIComponent(segs[2] ?? "");

  // ✅ 사람은 어떤 share 링크든 무조건 홈으로
  if (!bot) {
    return Response.redirect(new URL("/", url.origin), 302);
  }

  // --- 아래는 "봇에게만" OG를 내려줌 ---
  // share 경로가 아니면 404 OG도 가능하지만, 여기서는 그냥 404
  if (shareRoot !== "share") return new Response("Not Found", { status: 404 });

  // boardID가 없거나 미지원이면: 기본 OG로 처리(봇에게는 200이 보통 더 안전)
  const base = BOARD_IMAGE_BASE[boardID];
  const fileName = codeToFileName(codeOrName);

  const title = "lovt";
  const desc = "러빗과 함께 나의 취향 사분면을 찾아보세요";

  // ✅ 기본 이미지(없는 링크에서도 미리보기는 떠야 하니까)
  const fallbackOgImage = new URL("/OG_TAG_DEFAULT.jpg", url.origin).toString();

  const ogImage =
    base && fileName
      ? new URL(`${base}${fileName}`, url.origin).toString()
      : fallbackOgImage;

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
      // OG는 캐시 조금만 (원하면 올려도 됨)
      "cache-control": "public, max-age=300",
    },
  });
};
