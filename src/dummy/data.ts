import type { Summary } from "../type/type";

export const initialRow = [0, 1, 2, -5, 3, 4, -4, 5, -3, 6, -2, 7, 8, -1, 9];
export const initialCol = [0, 1, 2, -5, 3, 4, -4, 5, -3, 6, -2, 7, 8, -1, 9];

export const dummyData: Record<number, Summary> = {
  0: {
    id: 0,
    name: "토이스토리 1",
    thumbnaeilURL:
      "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20111223_166%2F1324619308419RAp5L_JPEG%2Fmovie_image.jpg",
  },
  1: {
    id: 1,
    name: "초여름의 소음",
    thumbnaeilURL: "https://picsum.photos/seed/movie-1/320/480",
  },
  2: {
    id: 2,
    name: "라스트 팝콘",
    thumbnaeilURL: "https://picsum.photos/seed/movie-2/320/480",
  },
  3: {
    id: 3,
    name: "유리창 너머",
    thumbnaeilURL: "https://picsum.photos/seed/movie-3/320/480",
  },
  4: {
    id: 4,
    name: "새벽 2시의 편집실",
    thumbnaeilURL: "https://picsum.photos/seed/movie-4/320/480",
  },
  5: {
    id: 5,
    name: "러닝타임 99",
    thumbnaeilURL: "https://picsum.photos/seed/movie-5/320/480",
  },
  6: {
    id: 6,
    name: "나의 작은 디스토피아",
    thumbnaeilURL: "https://picsum.photos/seed/movie-6/320/480",
  },
  7: {
    id: 7,
    name: "엔딩 크레딧 이후",
    thumbnaeilURL: "https://picsum.photos/seed/movie-7/320/480",
  },
  8: {
    id: 8,
    name: "비 오는 날의 몽타주",
    thumbnaeilURL: "https://picsum.photos/seed/movie-8/320/480",
  },
  9: {
    id: 9,
    name: "스포일러 없는 사랑",
    thumbnaeilURL: "https://picsum.photos/seed/movie-9/320/480",
  },
};
