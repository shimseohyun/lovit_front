import { useEffect, useState } from "react";
import type { BoardData, Step } from "./type";

type Parms = {
  initRow?: BoardData;
  initCol?: BoardData;
  newData: number[];
};

const useBoardTotalData = (parms: Parms) => {
  const {
    initCol = [-5, -4, -3, -2, -1],
    initRow = [-5, -4, -3, -2, -1],
    newData,
  } = parms;

  const [row, setRow] = useState<BoardData>(initCol);
  const [col, setCol] = useState<BoardData>(initRow);

  const [step, setStep] = useState<Step>("BOARD");
  const getStep = (s: Step) => {
    console.log(s);
    setStep(s);
  };
  const [currentIDX, setCurrentIDX] = useState<number>(0);

  useEffect(() => {
    if (currentIDX === newData.length) {
      setStep("LIKED");
    }
  }, [currentIDX]);

  const confirmNext = (slotR: number, slotC: number) => {
    let currentRow = row;
    let currentCol = col;
    currentRow.splice(slotR, 0, newData[currentIDX]);
    currentCol.splice(slotC, 0, newData[currentIDX]);

    setRow(currentRow);
    setCol(currentCol);
    setCurrentIDX(currentIDX + 1);
  };
  return { row, col, confirmNext, step, getStep, currentIDX };
};

export default useBoardTotalData;
