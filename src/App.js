import { useState, useEffect } from "react";
import Square from "./components/Square";
import "./App.css";

function App() {
  const [win, updateWin] = useState(false);
  const [turn, updateTurn] = useState(1);
  const [board, updateBoard] = useState([...Array(9).keys()].map((i) => null));
  const [history, updateHistory] = useState([
    [...Array(9).keys()].map((i) => null),
  ]);

  useEffect(() => {
    if (checkWin()) updateWin(true);
    // eslint-disable-next-line
  }, [board]);

  // useEffect(() => {
  //   console.log(history);
  // }, [history]);

  function checkWin() {
    const winConfig = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // console.log(board);
    for (let i = 0; i < winConfig.length; ++i) {
      if (
        board[winConfig[i][0]] !== null &&
        board[winConfig[i][1]] !== null &&
        board[winConfig[i][2]] !== null &&
        board[winConfig[i][0]] % 2 === board[winConfig[i][1]] % 2 &&
        board[winConfig[i][1]] % 2 === board[winConfig[i][2]] % 2
      )
        return true;
    }
    return false;
  }

  function onClick(pos) {
    let boardCopy = [...board];
    boardCopy[pos] = turn;
    updateBoard(boardCopy);
    updateHistory((prev) => [...prev, boardCopy]);
    if (!win) updateTurn((prev) => prev + 1);
  }

  function handleRevert(obj, i) {
    // console.log(obj);
    updateBoard(obj);
    let historyCopy = [...history];
    updateHistory(historyCopy.slice(0, i + 1));
    updateTurn(i + 1);
    updateWin(false);
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <h2 className="title">
        {win
          ? turn % 2
            ? "X wins!"
            : "O wins!"
          : turn > 9
          ? "Draw!"
          : turn % 2
          ? "It is now O's turn."
          : "It is now X's turn."}
      </h2>
      <div className="row">
        <Square onClick={onClick} turn={turn} pos={0} win={win} board={board} />
        <Square onClick={onClick} turn={turn} pos={1} win={win} board={board} />
        <Square onClick={onClick} turn={turn} pos={2} win={win} board={board} />
      </div>
      <div className="row">
        <Square onClick={onClick} turn={turn} pos={3} win={win} board={board} />
        <Square onClick={onClick} turn={turn} pos={4} win={win} board={board} />
        <Square onClick={onClick} turn={turn} pos={5} win={win} board={board} />
      </div>
      <div className="row">
        <Square onClick={onClick} turn={turn} pos={6} win={win} board={board} />
        <Square onClick={onClick} turn={turn} pos={7} win={win} board={board} />
        <Square onClick={onClick} turn={turn} pos={8} win={win} board={board} />
      </div>
      <div className="history">
        {history.slice(0, -1).map((obj, i) =>
          i > 0 ? (
            <button onClick={() => handleRevert(obj, i)} key={i}>
              Go to turn {i}
            </button>
          ) : (
            <button onClick={() => handleRevert(obj, i)} key={i}>
              Go to beginning
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default App;
