export default function GameBoard({ board, onTileClick }) {
    return (
      <div className="game-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`board-cell ${cell.bonus || ''}`}
                onClick={() => onTileClick(rowIndex, colIndex)}
              >
                {cell.letter}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }