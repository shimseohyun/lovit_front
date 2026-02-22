const url = "http://localhost:5173/";
const text = "가나다라마바사";

export const shareX = () => {
  const intentURL =
    `https://twitter.com/intent/tweet?` +
    `text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(intentURL, "_blank", "noopener,noreferrer");
};

export const copyLink = () => {};

export const downloadImage = () => {};
