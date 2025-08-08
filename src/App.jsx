import React, { useState, useMemo } from 'react';
import './App.css'; // Create this CSS file for styling

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(board) {

  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }

  if (board.every(Boolean)) return { winner: 'Draw', line: [] };

  return null;

}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const result = useMemo(() => calculateWinner(board), [board]);

  function handleClick(i) {
    if (board[i] || result) return;
    const next = board.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setBoard(next);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  const status = result
    ? result.winner === 'Draw'
      ? "It's a draw!"
      : `Winner: ${result.winner}`
    : `Next: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="container">
      <h1>Tic — Tac — Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {board.map((cell, i) => {
          const isWinningCell = result && result.line && result.line.includes(i);
          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`cell ${isWinningCell ? 'win' : ''}`}
            >
              {cell}
            </button>
          );
        })}
      </div>
      <div className="controls">
        <button onClick={reset}>Reset</button>
        <button
          onClick={() => {
            const empty = board.map((v, i) => (v ? null : i)).filter((v) => v !== null);
            if (!empty.length || result) return;
            const pick = empty[Math.floor(Math.random() * empty.length)];
            handleClick(pick);
          }}
        >
          Random Move
        </button>
      </div>
    </div>
  );
}
