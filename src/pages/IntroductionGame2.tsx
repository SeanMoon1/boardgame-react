import React, { useState } from "react";
import Dice3D from "../components/Dice3D";
import { useDiceGame } from "../hooks/useDiceGame";
import "./IntroductionGame2.css";

const IntroductionGame2: React.FC = () => {
  const { resetGame } = useDiceGame();
  const [showDice, setShowDice] = useState(true);
  const [currentMent, setCurrentMent] = useState("");

  const ment = [
    "여러분은 자주 가는 식당이 있습니까? <br> 그 식당의 좋은 점과 나쁜 점을 소개해 주세요.", // 1번
    "여러분의 나라에도 김치처럼 매일 먹는 음식이 있습니까? <br> 친구들에게 소개해 주세요.", // 2번
    "여러분은 특별히 닮고 싶은 사람이 있습니까? <br> 그 사람의 어떤 점을 닮고 싶은지 이야기해 보세요.", // 3번
    "우리 반 친구들의 첫인상은 어땠습니까? <br> 성격이 어떨 것 같았습니까? 이야기해 보세요", // 4번
    "여러분 나라에서는 배가 아프거나 감기에 걸리면 보통 어떻게 합니까? <br> 특별히 먹는 음식이 있습니까?", // 5번
    "여러분의 생활 습관 중에서 고치고 싶은 나쁜 습관이 있습니까? 이야기해 보세요.", // 6번
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
    <div className="introduction-game2">
      <div className="game-header">
        <h1>소개 해보기 2</h1>
        <button onClick={handleReset} className="reset-btn">
          다시 시작
        </button>
      </div>

      <div className="game-content">
        {showDice ? (
          <div className="dice-container">
            <Dice3D size="large" onRoll={handleDiceRoll} />
          </div>
        ) : (
          <div className="result-container">
            <div 
              className="ment-result" 
              dangerouslySetInnerHTML={{ __html: currentMent }}
            />
            <button onClick={handleShowDice} className="show-dice-btn">
              주사위 다시 굴리기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroductionGame2;
