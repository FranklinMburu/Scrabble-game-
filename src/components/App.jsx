import { useState, useEffect } from 'react'
import { createEmptyBoard, createLetterBag } from '../utils/game-utils'
import GameBoard from './GameBoard'
import PlayerRack from './PlayerRack'
import Scoreboard from './Scoreboard'
import './App.css'

export default function App() {
  const [board, setBoard] = useState(createEmptyBoard())
  const [rack, setRack] = useState([])
  const [selectedTile, setSelectedTile] = useState(null)
  const [letterBag, setLetterBag] = useState(createLetterBag())
  const [scores, setScores] = useState({ player: 0, computer: 0 })
  const [currentTurn, setCurrentTurn] = useState([]) // Track player's move
  const [gameActive, setGameActive] = useState(true) // Track game status
  const [isPlayerTurn, setIsPlayerTurn] = useState(true) // Track turns
  const [passCount, setPassCount] = useState(0) // Count consecutive passes

  const drawTiles = (num) => {
    const newRack = [...rack]
    const newBag = [...letterBag]
    while (newRack.length < num && newBag.length > 0) {
      newRack.push(newBag.pop())
    }
    setRack(newRack)
    setLetterBag(newBag)
  }

  useEffect(() => {
    drawTiles(7)
  }, [])

  useEffect(() => {
    // Check for consecutive passes
    if (passCount >= 4) {
      endGame()
    }
  }, [passCount])

  const handleBoardClick = (row, col) => {
    console.log('Board clicked:', row, col)
  }

  const handleRackClick = (index) => {
    setSelectedTile(index === selectedTile ? null : index)
  }

  const handleSubmitTurn = () => {
    console.log('Turn submitted:', currentTurn)
    setIsPlayerTurn(false) // Switch turn to computer
    setCurrentTurn([]) // Reset current turn
  }

  const endGame = () => {
    setGameActive(false)

    // Calculate final scores
    let finalScores = { ...scores }

    // Subtract remaining tiles
    finalScores.player -= rack.reduce((sum, tile) => sum + tile.value, 0)
    finalScores.computer -= letterBag.length * 2 // Approx value

    setScores(finalScores)

    // Show winner
    alert(
      `Game Over! Winner: ${
        finalScores.player > finalScores.computer ? 'Player' : 'Computer'
      }`
    )
  }

  return (
    <div className="scrabble-container">
      <Scoreboard scores={scores} />
      <GameBoard board={board} onTileClick={handleBoardClick} />
      <PlayerRack
        tiles={rack}
        selectedIndex={selectedTile}
        onTileClick={handleRackClick}
      />

      <div className="game-controls">
        <button
          onClick={handleSubmitTurn}
          disabled={!currentTurn.length || !gameActive}
        >
          Submit Turn
        </button>
        <button
          onClick={() => {
            setPassCount((p) => p + 1)
            setIsPlayerTurn(false)
          }}
          disabled={!gameActive}
        >
          Pass
        </button>
        <div className="turn-indicator">
          {gameActive ? (isPlayerTurn ? "Your Turn" : "Computer's Turn") : "Game Over"}
        </div>
      </div>
    </div>
  )
}
