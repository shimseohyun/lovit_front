import { css } from "@emotion/react";
import styled from "@emotion/styled";

const withCenterHole = (count: number, holePx: number) => {
  // count는 기존 row/col 개수
  // 결과는 count+1개 트랙 (가운데만 holePx)
  const total = count + 1;
  const mid = Math.floor(total / 2);

  return Array.from({ length: total }, (_, i) =>
    i === mid ? `${holePx}px` : "1fr",
  ).join(" ");
};

const ColorGrid = styled.div`
  width: 400px;
  height: 400px;

  display: grid;
  gap: 2px;

  grid-template-columns: ${(p) => withCenterHole(6, 20)};
  grid-template-rows: ${(p) => withCenterHole(6, 20)};
`;

const ColorChip = styled.div<{ h: number; s: number; l: number }>`
  cursor: pointer;

  width: 100%;
  height: 100%;

  /* opacity: 30%; */

  :hover {
    opacity: 100%;
  }
  ${({ h, s, l }) => css`
    background-color: hsl(${h} ${s}% ${l}%);
  `}
`;

const lListH = [100, 96, 92, 88, 84, 80];
const lListV = [88, 92, 95, 95, 92, 88];

const increase = 40 / 6;
const hType = [200, 10];

const getType = (n: number) => {
  if (n >= 3) return 1;
  else if (n < 3) return 0;
  return 0;
};

const ColorTestPage = () => {
  return (
    <ColorGrid>
      {[0, 1, 2, -1, 3, 4, 5].map((r) =>
        [0, 1, 2, -1, 3, 4, 5].map((c) => {
          if (r == -1 || c == -1) {
            return <ColorChip h={0} s={100} l={100} />;
          }
          return (
            <ColorChip
              h={Math.floor((hType[getType(c)] + increase * r) % 360)}
              s={100}
              l={Math.floor((lListV[c] + lListH[r]) / 2)}
            />
          );
        }),
      )}
    </ColorGrid>
  );
};

export default ColorTestPage;
