import React, { useState } from "react";
import "../css/Square.css";

function Square({ onClick, turn, position }) {
  const [clicked, updateClicked] = useState(false);
  const [state, updateState] = useState(null);

  const onMouseClick = () => {
    if (!clicked) {
      onClick(position);
      updateClicked(true);
      updateState(turn);
    }
  };

  return (
    <div className="square" onClick={onMouseClick}>
      {clicked && <>{state ? "O" : "X"}</>}
    </div>
  );
}

export default Square;
