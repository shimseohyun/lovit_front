import type { Position, Title } from "@hooks/board/type";

export type BoardState = {
  slot?: Position;
  title?: Title;
  likeList: number[];
  likeDic: Record<number, boolean>;
};

export type BoardAction =
  | { type: "SET_SLOT"; payload: Position }
  | { type: "SET_TITLE"; payload: Title }
  | { type: "SET_LIKE"; payload: { id: number; liked: boolean } }
  | { type: "TOTAL_RESET" }
  | { type: "RESET" };

export const initialBoardState: BoardState = { likeList: [], likeDic: {} };

export function boardReducer(
  state: BoardState,
  action: BoardAction,
): BoardState {
  switch (action.type) {
    case "SET_SLOT":
      return { ...state, slot: action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_LIKE": {
      console.log(state);
      const { id, liked } = action.payload;

      const nextLikeDic = { ...state.likeDic, [id]: liked };

      const has = state.likeList.includes(id);
      const nextLikeList = liked
        ? has
          ? state.likeList
          : [...state.likeList, id]
        : state.likeList.filter((x) => x !== id);

      console.log("action", nextLikeDic, nextLikeList);
      return { ...state, likeList: nextLikeList, likeDic: nextLikeDic };
    }

    case "RESET":
      return { likeList: state.likeList, likeDic: state.likeDic };
    case "TOTAL_RESET":
      return { likeList: [], likeDic: {} };
    default:
      return state;
  }
}
