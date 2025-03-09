export default function PlayerRack({ tiles, selectedIndex, onTileClick }) {
    return (
      <div className="player-rack">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`rack-tile ${selectedIndex === index ? 'selected' : ''}`}
            onClick={() => onTileClick(index)}
          >
            <span className="tile-letter">{tile.letter}</span>
            <span className="tile-value">{tile.value}</span>
          </div>
        ))}
      </div>
    )
  }