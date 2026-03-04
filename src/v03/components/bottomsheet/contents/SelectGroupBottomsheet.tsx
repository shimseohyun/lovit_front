import Spacing from "@componentsV03/spacing/Spacing";
import * as S from "../Bottomsheet.styled";
import GroupList from "@pagesV03/select/components/groupList/GroupList";

import useCheckBoard from "@routersV03/checkingBoard";

const SelectGroupBottomsheet = () => {
  const { boardID, groupID } = useCheckBoard();

  if (boardID === undefined) return;
  return (
    <>
      <S.Title>
        <h3>어떤 결과를 확인할까요?</h3>
      </S.Title>
      <Spacing size={10} />
      <S.ScrollView>
        <GroupList boardID={boardID} isResult={true} groupID={groupID} />
      </S.ScrollView>
    </>
  );
};

export default SelectGroupBottomsheet;
