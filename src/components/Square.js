import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import "../css/Square.css";

function Square({ onClick, turn, pos, win, board }) {
  const [clicked, updateClicked] = useState(false);
  const [state, updateState] = useState(null);

  useEffect(() => {
    if (board[pos] === null) {
      updateClicked(false);
      updateState(null);
    }
  }, [board, pos]);

  function onMouseClick() {
    if (!win && !clicked) {
      onClick(pos);
      updateClicked(true);
      updateState(turn);
    }
  }

  return (
    <div className="square" onClick={onMouseClick}>
      {clicked && <>{state % 2 ? "O" : "X"}</>}
    </div>
  );
}

export default Square;
