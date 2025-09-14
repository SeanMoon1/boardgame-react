import React, { useState } from "react";
import Dice3D from "../components/Dice3D";
import "./DiceOnlyGame.css";

const DiceOnlyGame: React.FC = () => {
  const [lastResult, setLastResult] = useState<number | null>(null);

  const handleDiceRoll = (result: number) => {
    setLastResult(result);
  };

  const handleReset = () => {
    setLastResult(null);
  };

  return (
    <div className="dice-only-game">
      <div className="game-header">
        <h1>주사위</h1>
        <button onClick={handleReset} className="reset-btn">
          다시 시작
        </button>
      </div>

      <div className="game-content">
        <Dice3D size="large" onRoll={handleDiceRoll} />
        {lastResult && <div className="result">결과: {lastResult}</div>}
      </div>
    </div>
  );
};

export default DiceOnlyGame;
