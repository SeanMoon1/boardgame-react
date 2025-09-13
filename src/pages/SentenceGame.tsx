import React, { useState } from "react";
import Dice3D from "../components/Dice3D";
import { useDiceGame } from "../hooks/useDiceGame";
import "./SentenceGame.css";

const SentenceGame: React.FC = () => {
  const { resetGame: resetDice1 } = useDiceGame();
  const { resetGame: resetDice2 } = useDiceGame();

  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");

  const dice1Words = ["알다", "만들다", "살다", "놀다", "팔다", "열다"];

  const dice2Words = [
    "-아요/어요",
    "-습니다/ㅂ니다",
    "-았어요/었어요",
    "-으세요/세요",
    "-으려고/려고 해요",
    "-네요",
  ];

  const handleDice1Roll = (result: number) => {
    setWord1("");
    setTimeout(() => {
      setWord1(dice1Words[result - 1]);
    }, 1000);
  };

  const handleDice2Roll = (result: number) => {
    setWord2("");
    setTimeout(() => {
      setWord2(dice2Words[result - 1]);
    }, 1000);
  };

  const handleReset = () => {
    resetDice1();
    resetDice2();
    setWord1("");
    setWord2("");
  };

  return (
    <div className="sentence-game">
      <div className="game-header">
        <h1>문장 말해 보기</h1>
        <button onClick={handleReset} className="reset-btn">
          다시 시작
        </button>
      </div>

      <div className="game-content">
        <div className="dice-section">
          <div className="dice-result-container">
            <Dice3D size="medium" onRoll={handleDice1Roll} />
            <div className="result">{word1}</div>
          </div>
        </div>

        <div className="dice-section">
          <div className="dice-result-container">
            <Dice3D size="medium" onRoll={handleDice2Roll} />
            <div className="result">{word2}</div>
          </div>
        </div>
      </div>

      {word1 && word2 && (
        <div className="sentence-result">
          <h3>완성된 문장:</h3>
          <p className="sentence">
            {word1} {word2}
          </p>
        </div>
      )}
    </div>
  );
};

export default SentenceGame;
