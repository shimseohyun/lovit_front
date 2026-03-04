import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { BOARD_INFO_DICT } from "@dataV03/boardInformation";

type Params = {
  boardID?: string;
  groupID?: string;
};

type UseCheckBoardReturn =
  | { isTrue: true; boardID: number; groupID: number | undefined }
  | { isTrue: false; boardID: undefined; groupID: undefined };

const useCheckBoard = (): UseCheckBoardReturn => {
  const { boardID, groupID } = useParams<Params>();

  return useMemo(() => {
    try {
      if (!boardID) throw new Error();

      const boardParsedID = Number(boardID);
      if (!Number.isFinite(boardParsedID)) throw new Error();

      const board = BOARD_INFO_DICT[boardParsedID];
      if (!board) throw new Error();

      const groupParsedID = groupID !== undefined ? Number(groupID) : undefined;

      if (groupID !== undefined && !Number.isFinite(groupParsedID))
        throw new Error();

      if (groupParsedID !== undefined && !board.itemGroupDict?.[groupParsedID])
        throw new Error();

      return { isTrue: true, boardID: boardParsedID, groupID: groupParsedID };
    } catch {
      return { isTrue: false, boardID: undefined, groupID: undefined };
    }
  }, [boardID, groupID]);
};

export default useCheckBoard;
