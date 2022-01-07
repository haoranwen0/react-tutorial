import { useState } from "react";
import Square from "./components/Square";
import "./App.css";

function App() {
  const [turn, updateTurn] = useState(true);

  function onClick() {
    console.log("click");
    updateTurn((prev) => !prev);
  }

  return (
    <div className="App">
      <h1 className="title">It is now {turn ? "O" : "X"}'s turn.</h1>
      <div className="row">
        <Square onClick={onClick} turn={turn} />
        <Square onClick={onClick} turn={turn} />
        <Square onClick={onClick} turn={turn} />
      </div>
      <div className="row">
        <Square onClick={onClick} turn={turn} />
        <Square onClick={onClick} turn={turn} />
        <Square onClick={onClick} turn={turn} />
      </div>
      <div className="row">
        <Square onClick={onClick} turn={turn} />
        <Square onClick={onClick} turn={turn} />
        <Square onClick={onClick} turn={turn} />
      </div>
    </div>
  );
}

export default App;
