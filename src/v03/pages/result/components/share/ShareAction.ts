const { origin } = window.location;

const makeShareUrlFromImg = (boardID: number, imgURL: string) => {
  const last = imgURL.split("/").pop() ?? "";
  const file = last.split(".")[0]; // 쿼리/해시 제거
  const baseName = file.replace("_", ""); // 확장자 제거(.png 등)

  if (!baseName) return origin;
  return `${origin}/share/${boardID}/${encodeURIComponent(baseName)}`;
};

const getContents = (label: string, shareUrl: string) => {
  return `나는 [${label}]\n러빗과 함께 나의 취향 사분면을 찾아보세요\n\n${shareUrl}`;
};

export const shareX = (parms: {
  label: string;
  boardID: number;
  imgURL: string;
}) => {
  const shareUrl = makeShareUrlFromImg(parms.boardID, parms.imgURL);

  const intentURL =
    `https://twitter.com/intent/tweet?` +
    `text=${encodeURIComponent(getContents(parms.label, shareUrl))}`;

  window.open(intentURL, "_blank", "noopener,noreferrer");
};

export const copyLink = async (parms: { boardID: number; imgURL: string }) => {
  const shareUrl = makeShareUrlFromImg(parms.boardID, parms.imgURL);

  try {
    await navigator.clipboard.writeText(shareUrl);
    alert("링크가 복사되었어요!");
  } catch (e) {
    alert("링크 복사에 실패했어요.");
    console.error(e);
  }
};
