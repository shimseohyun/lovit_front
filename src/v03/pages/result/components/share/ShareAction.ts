const { origin } = window.location;

const getContents = (label: string) => {
  return `나는 [${label}]\n러빗과 함께 나의 취향 사분면을 찾아보세요\n\n${origin}`;
};

export const shareX = (label: string) => {
  const intentURL =
    `https://twitter.com/intent/tweet?` +
    `text=${encodeURIComponent(getContents(label))}`;
  window.open(intentURL, "_blank", "noopener,noreferrer");
};

export const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(origin);
    alert("링크가 복사되었어요!");
  } catch (e) {
    alert("링크 복사에 실패했어요.");
    console.error(e);
  }
};
