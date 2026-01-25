import {
  useBoardActions,
  useBoardState,
  useBoardStatic,
} from "@hooks/board/context/BoardContext";

import * as S from "./Board.styled";
import TouchBoardMarker from "./marker/TouchBoardMarker";
import type { Step } from "@hooks/board/type";
import Result from "@components/result/Result";

import {
  horizontalGroupLabel,
  verticalGroupLabel,
} from "@hooks/board/useBoardDescription";
import React from "react";

type Parms = {
  step: Step;
};
const TouchBoard = (parms: Parms) => {
  const { step } = parms;

  const { likeDic } = useBoardState();
  const {
    summaryData,

    verticalSeparatedData,
    horizontalSeparatedData,
    points,
  } = useBoardStatic();

  const { setSlot } = useBoardActions();

  const onCellClick = (row: number, col: number) => {
    if (step == "RESULT") return;
    let rSlot = 0;

    let cSlot = 0;
    for (let r = 0; r < row; r++) {
      rSlot += verticalSeparatedData[r].length + 1;
    }
    rSlot += Math.floor(verticalSeparatedData[row].length / 2);
    for (let c = 0; c < col; c++) {
      cSlot += horizontalSeparatedData[c].length + 1;
    }
    cSlot += Math.floor(horizontalSeparatedData[col].length / 2);

    setSlot({ r: rSlot, c: cSlot });
  };

  return (
    <>
      <S.BoardGrid $rows={6} $cols={6}>
        {verticalGroupLabel.map((_, r) =>
          horizontalGroupLabel.map((_, c) => {
            let cIDX = c > 2 ? c + 2 : c + 1;
            let rIDX = r > 2 ? r + 2 : r + 1;
            return (
              <S.PiecesGrid
                style={{ gridColumnStart: cIDX, gridRowStart: rIDX }}
                key={`${r}-${c}`}
                onClick={() => onCellClick(r, c)}
              />
            );
          }),
        )}
      </S.BoardGrid>

      <S.SwipeAxisDescriptionList $axis="horizontal">
        {horizontalGroupLabel.map((label, i) => (
          <React.Fragment key={i}>
            <S.SwipeAxisDescriptionLabel $axis="horizontal">
              {label}
            </S.SwipeAxisDescriptionLabel>

            {i !== 2 ? (
              <S.SwipeAxisLine $axis="horizontal" />
            ) : (
              <S.SwipeAxisCenter />
            )}
          </React.Fragment>
        ))}
      </S.SwipeAxisDescriptionList>

      <S.SwipeAxisDescriptionList $axis="vertical">
        {verticalGroupLabel.map((label, i) => (
          <React.Fragment key={i}>
            <S.SwipeAxisDescriptionLabel $axis="vertical">
              {label}
            </S.SwipeAxisDescriptionLabel>

            {i !== 2 ? (
              <S.SwipeAxisLine $axis="vertical" />
            ) : (
              <S.SwipeAxisCenter />
            )}
          </React.Fragment>
        ))}
      </S.SwipeAxisDescriptionList>

      {step === "RESULT" && <Result />}

      {points.map((point) => {
        const id = point.id;
        return (
          <S.MarkerContainer
            key={id}
            style={{
              left: `${point.x.toFixed(2)}px`,
              top: `${point.y.toFixed(2)}px`,
            }}
          >
            <TouchBoardMarker
              isSelected={step === "RESULT" && likeDic[id]}
              info={summaryData[id]}
            />
          </S.MarkerContainer>
        );
      })}
    </>
  );
};

export default TouchBoard;
