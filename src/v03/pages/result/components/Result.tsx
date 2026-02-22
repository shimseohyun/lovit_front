import { Separator } from "@componentsV03/layout/DefaultLayout";

import Spacing from "@componentsV03/spacing/Spacing";

import Share from "./share/Share";

import TotalResultList from "./total/TotalResultList";
import ResultBoard from "./board/ResultBoard";

const Result = () => {
  return (
    <>
      <ResultBoard />
      <Share />
      <Separator $size={8} />

      {/* 전체 결과 */}
      <TotalResultList />
      <Spacing size={40} />
    </>
  );
};

export default Result;
