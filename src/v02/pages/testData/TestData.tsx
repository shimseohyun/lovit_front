import type { RoughAxisData } from "@interfacesV02/data/user";
import convertRoughAxisData from "@utilsV02/convertRoughAxisData";

const horizontalData: RoughAxisData = [
  [[0]],
  [
    [1, 2, 3],
    [4, 5, 6],
  ],
  [
    [7, 8, 9],
    [10, 11],
    [12, 13],
  ],
  [],
  [[14, 15]],
  [],
];

const preferenceData: RoughAxisData = [
  [[0]],
  [[1]],
  [[2]],
  [[3]],
  [[4, 5]],
  [],
  [[6]],
  [[7]],
  [[8]],
  [[9]],
  [[10]],
];

const TestPage = () => {
  const horizontalAxis = convertRoughAxisData(horizontalData, 3, "EVALUATION");
  const preferenceAxis = convertRoughAxisData(preferenceData, 11, "PREFERENCE");

  console.log(horizontalAxis);
  console.log(preferenceAxis);
  return (
    <>
      <h1>테스트 페이지</h1>
    </>
  );
};

export default TestPage;
