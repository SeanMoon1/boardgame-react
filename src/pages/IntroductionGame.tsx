import React, { useState } from "react";
import Dice3D from "../components/Dice3D";
import { useDiceGame } from "../hooks/useDiceGame";
import "./IntroductionGame.css";

const IntroductionGame: React.FC = () => {
  const { resetGame, rollDice } = useDiceGame();
  const [showDice, setShowDice] = useState(true);
  const [currentMent, setCurrentMent] = useState("");

  const ment = [
    "우리 반 친구 한 명에 대해서 소개해 보세요.",
    "여러분이 가지고 있는 물건 중에 가장 좋아하는 것은 무엇입니까? 왜 그것을 좋아합니까? 친구들에게 소개해 보세요.",
    "여러분 나라의 수도는 어디입니까? 그곳은 어떤 곳이고 무엇이 유명합니까? 친구들에게 소개해 보세요.",
    "여러분은 중,고등학교 때 어떤 취미가 있었습니까?",
    "여러분은 배워 보고 싶은 것이 있습니까? 왜 그것을 배우고 싶습니까? 친구들에게 이야기해 보세요.",
    "여러분은 한국에서 어느 도시에 가 봤습니까? 그곳에서 무엇을 했습니까? 여러분의 경험을 이야기해 보세요.",
  ];

  const handleDiceRoll = (result: number) => {
    setCurrentMent("");
    setTimeout(() => {
      setCurrentMent(ment[result - 1]);
      setShowDice(false);
    }, 1000);
  };

  const handleShowDice = () => {
    setShowDice(true);
    setCurrentMent("");
  };

  const handleReset = () => {
    resetGame();
    setShowDice(true);
    setCurrentMent("");
  };

  return (
    <div className="introduction-game">
      <div className="game-header">
        <h1>소개 해보기</h1>
        <button onClick={handleReset} className="reset-btn">
          다시 시작
        </button>
      </div>

      <div className="game-content">
        {showDice ? (
          <div className="dice-container">
            <Dice3D size="large" onRoll={handleDiceRoll} rollDice={rollDice} />
          </div>
        ) : (
          <div className="result-container">
            <div className="ment-result">{currentMent}</div>
            <button onClick={handleShowDice} className="show-dice-btn">
              주사위 다시 굴리기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroductionGame;
