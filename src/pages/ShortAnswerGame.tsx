import React, { useState } from "react";
import Dice3D from "../components/Dice3D";
import { useDiceGame } from "../hooks/useDiceGame";
import "./ShortAnswerGame.css";

const ShortAnswerGame: React.FC = () => {
  const { resetGame } = useDiceGame();
  const [currentWord, setCurrentWord] = useState("");

  const words = ["모르다", "다르다", "서두르다", "오르다", "빠르다", "부르다"];

  const handleDiceRoll = (result: number) => {
    setCurrentWord("");
    setTimeout(() => {
      setCurrentWord(words[result - 1]);
    }, 1000);
  };

  const handleReset = () => {
    resetGame();
    setCurrentWord("");
  };

  return (
    <div className="short-answer-game">
      <div className="game-header">
        <h1>-아요 / 어요</h1>
        <button onClick={handleReset} className="reset-btn">
          다시 시작
        </button>
      </div>

      <div className="game-content">
        <div className="dice-container">
          <Dice3D size="large" onRoll={handleDiceRoll} />
          <div className="word-result">{currentWord}</div>
        </div>
      </div>
    </div>
  );
};

export default ShortAnswerGame;
