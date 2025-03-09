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

  const handleBoardClick = (row, col) => {
    console.log('Board clicked:', row, col)
  }

  const handleRackClick = (index) => {
    setSelectedTile(index === selectedTile ? null : index)
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
    </div>
  )
}