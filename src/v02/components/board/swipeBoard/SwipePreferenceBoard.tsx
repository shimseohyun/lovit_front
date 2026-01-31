import { useBoardDataContext } from "@hooksV02/data/useBoardDataContext";
import SwipeBoard from "./SwipeBoard";
import { useCallback } from "react";
import type { SlotDict } from "@interfacesV02/type";

const SwipePreferenceBoard = () => {
  const { preference, setPreferenceSlot } = useBoardDataContext();

  const handleSlotChange = useCallback((next: SlotDict) => {
    if (next.HORIZONTAL === undefined) return;
    setPreferenceSlot({ preference: next.HORIZONTAL });
  }, []);

  // TODO: 가운데를 찾는 인덱스가 없음 ㅜ
  const centerIDX = Math.floor(preference.slotList.length / 2);
  return (
    <>
      <h1></h1>
      <SwipeBoard
        dataList={[preference]}
        axisList={["HORIZONTAL"]}
        initialH={centerIDX}
        onSlotChange={handleSlotChange}
      />

      <button onClick={() => {}}>확인</button>
    </>
  );
};

export default SwipePreferenceBoard;
