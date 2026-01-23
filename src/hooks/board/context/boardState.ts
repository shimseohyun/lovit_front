import type { Position, Title } from "@hooks/board/type";

export type BoardState = {
  slot?: Position;
  title?: Title;
};

export type BoardAction =
  | { type: "SET_SLOT"; payload: Position }
  | { type: "SET_TITLE"; payload: Title }
  | { type: "RESET" };

export const initialBoardState: BoardState = {};

export function boardReducer(
  state: BoardState,
  action: BoardAction,
): BoardState {
  switch (action.type) {
    case "SET_SLOT":
      return { ...state, slot: action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "RESET":
      return {};
    default:
      return state;
  }
}
