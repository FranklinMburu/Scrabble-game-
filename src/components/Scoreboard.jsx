export default function Scoreboard({ scores }) {
    return (
      <div className="scoreboard">
        <div className="score player-score">
          <h3>Player</h3>
          <p>{scores.player}</p>
        </div>
        <div className="score computer-score">
          <h3>Computer</h3>
          <p>{scores.computer}</p>
        </div>
      </div>
    )
  }