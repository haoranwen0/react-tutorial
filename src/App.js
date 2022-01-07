import { useState, useEffect } from "react";
import Square from "./components/Square";
import "./App.css";

function App() {
  const [turn, updateTurn] = useState(true);
  const [board, updateBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [winner, setWinner] = useState(null);
  const [reset, updateReset] = useState(0);

  useEffect(() => {
    console.log("Current board: ", board);
    const result = checkWinner(board);
    if (result !== null) {
      setWinner(result + " has won the game!");
    } else if (endOfGame(board)) {
      setWinner("Draw!");
    }
    // eslint-disable-next-line
  }, [board]);

  const onClick = (pos) => {
    console.log("position of square clicked: ", pos);
    updateTurn((prev) => !prev);
    let boardCopy = [...board];
    boardCopy[pos] = turn ? "O" : "X";
    updateBoard(boardCopy);
  };

  const allEqual = (arr) => arr.every((val) => val === arr[0]);
  const endOfGame = (arr) => arr.every((val) => val !== null);

  const checkWinner = (board) => {
    const winConfigurations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winConfigurations.length; i++) {
      let boardConfiguration = [];
      for (let j = 0; j < winConfigurations[i].length; j++) {
        boardConfiguration.push(board[winConfigurations[i][j]]);
      }
      const [one, two, three] = boardConfiguration;
      console.log([one, two, three]);
      if (allEqual(boardConfiguration)) {
        return boardConfiguration[0];
      }
    }

    return null;
  };

  const handleReset = (e) => {
    updateBoard([null, null, null, null, null, null, null, null, null]);
    updateTurn((prev) => !prev);
    setWinner(null);
    updateReset((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1 className="title">
        {winner ? <>{winner}</> : <>It is now {turn ? "O" : "X"}'s turn</>}
      </h1>
      <div
        style={winner ? { opacity: "0.5", pointerEvents: "none" } : null}
        className="row one"
      >
        <Square onClick={onClick} turn={turn} position={0} reset={reset} />
        <Square onClick={onClick} turn={turn} position={1} reset={reset} />
        <Square onClick={onClick} turn={turn} position={2} reset={reset} />
      </div>
      <div
        style={winner ? { opacity: "0.5", pointerEvents: "none" } : null}
        className="row two"
      >
        <Square onClick={onClick} turn={turn} position={3} reset={reset} />
        <Square onClick={onClick} turn={turn} position={4} reset={reset} />
        <Square onClick={onClick} turn={turn} position={5} reset={reset} />
      </div>
      <div
        style={winner ? { opacity: "0.5", pointerEvents: "none" } : null}
        className="row three"
      >
        <Square onClick={onClick} turn={turn} position={6} reset={reset} />
        <Square onClick={onClick} turn={turn} position={7} reset={reset} />
        <Square onClick={onClick} turn={turn} position={8} reset={reset} />
      </div>
      <button className="restart-btn" onClick={handleReset}>
        Restart Game
      </button>
    </div>
  );
}

export default App;
