import FillButton from "@componentsV03/button/FillButton";
import { useNavigate } from "react-router-dom";
type Parms = {
  boardID: number;
};

const GroupAllCard = (parms: Parms) => {
  const { boardID } = parms;
  const navigate = useNavigate();
  return (
    <FillButton
      onClick={() => navigate(`/evaluate/${boardID}`)}
      children="렌덤으로 진행하기"
    />
  );
};

export default GroupAllCard;
