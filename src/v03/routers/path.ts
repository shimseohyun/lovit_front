export const RESULT = (boardID: number, groupID?: number) => {
  return groupID !== undefined
    ? `/result/${boardID}/${groupID}`
    : `/result/${boardID}`;
};

export const EVALUATE = (boardID: number, groupID?: number) => {
  return groupID !== undefined
    ? `/evaluate/${boardID}/${groupID}`
    : `/evaluate/${boardID}`;
};

export const SELECT = (boardID: number) => {
  return `/select/${boardID}`;
};
