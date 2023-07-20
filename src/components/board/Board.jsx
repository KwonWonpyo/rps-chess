import React from "react";
import { observer } from "mobx-react-lite";
import BoardTile from "./BoardTile";

/**
 * field를 화면에 표시합니다.
 * @param {field} 화면에 표시할 field 정보 (2D Array)
 * @returns 보드판 형태의 컴포넌트
 */
function Board({ field, onClick }) {
  const renderSquare = (x, y, pawn) => {
    return (
      <>
        <BoardTile
          x={x}
          y={y}
          pawn={pawn}
          onClick={() => {
            onClick(x, y);
          }}
        />
      </>
    );
  };

  return (
    <div className="border-grey-400 flex flex-col border-2">
      {field.map((row, m) => {
        return (
          <div className="flex flex-row">
            {row.map((col, n) => {
              return renderSquare(m, n, col);
            })}
          </div>
        );
      })}
    </div>
  );
}

export default observer(Board);
