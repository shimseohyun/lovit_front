import * as S from "./Bottomsheet.styled";
import { useBottomSheet } from "@hooksV02/bottomsheet/useBottomsheet";

const Bottomsheet = () => {
  const { isOpen, content, closeBottomSheet } = useBottomSheet();
  const onClick = () => {
    closeBottomSheet();
  };

  return (
    isOpen && (
      <>
        <S.Viewport onClick={onClick} />
        <S.Container>{content}</S.Container>
      </>
    )
  );
};

export default Bottomsheet;
