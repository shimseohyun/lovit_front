import useCheckBoard from "@routersV03/checkingBoard";
import { Navigate } from "react-router-dom";
import SelectPageContainer from "./components/SelectPageContainer";

const SelectePage = () => {
  const { isTrue, boardID } = useCheckBoard();

  if (isTrue)
    return (
      <>
        <SelectPageContainer boardID={boardID} />
      </>
    );
  else {
    return <Navigate to={"/"} replace={true} />;
  }
};

export default SelectePage;
