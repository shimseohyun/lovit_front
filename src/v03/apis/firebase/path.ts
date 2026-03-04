export const USER_BOARD = (boardID: number) => {
  if (boardID === 0) return `userBoardData`;
  return `userBoardData_${boardID}`;
};

export const TOTAL_BOARD = (boardID: number) => {
  if (boardID === 0) return `totalBoardData`;
  return `totalBoardData_${boardID}`;
};
