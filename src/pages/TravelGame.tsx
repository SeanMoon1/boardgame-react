import React, { useState } from "react";
import GameBoard from "../components/GameBoard";
import Dice3D from "../components/Dice3D";
import { useTravelGame } from "../hooks/useTravelGame";
import "./TravelGame.css";

const TravelGame: React.FC = () => {
  const {
    gameState,
    setGameState,
    boardSpots,
    showSpotInfo,
    currentSpot,
    startGame,
    nextTurn,
    checkSkipTurn,
    setSkipTurn,
    showSpot,
    hideSpot,
    resetGame,
  } = useTravelGame();

  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [winner, setWinner] = useState("");

  const handleStart = () => {
    if (player1Name.trim() || player2Name.trim()) {
      startGame(player1Name, player2Name);
      setShowStartScreen(false);
    }
  };

  const handleDiceRoll = (result: number) => {
    if (!gameState.gameActive) return;

    // 현재 플레이어가 쉬는 턴인지 체크
    if (checkSkipTurn()) {
      setSkipTurn(false);
      nextTurn();
      return;
    }

    // 주사위 결과로 플레이어 이동 (원본과 동일하게 setTimeout 사용)
    setTimeout(() => {
      const currentPlayer = gameState.players[gameState.currentPlayer];
      const oldPos = currentPlayer.pos;
      const newPos = (currentPlayer.pos + result) % gameState.totalSpots;
      const spot = boardSpots[newPos];

      // 플레이어 위치 업데이트
      const updatedPlayers = [...gameState.players];
      updatedPlayers[gameState.currentPlayer].pos = newPos;
      
      // 1바퀴 돌았는지 체크
      if (oldPos + result >= gameState.totalSpots) {
        updatedPlayers[gameState.currentPlayer].lap += 1;
        setWinner(updatedPlayers[gameState.currentPlayer].name);
        setShowEndScreen(true);
        return;
      }

      // 게임 상태 업데이트
      setGameState(prev => ({
        ...prev,
        players: updatedPlayers
      }));

      // 도착한 칸 정보 표시
      showSpot(spot);

      // "한 번 쉬세요" 칸 체크
      if (spot.label.includes("쉬세요")) {
        setSkipTurn(true);
      }
    }, 1000);
  };

  const handleSpotClick = () => {
    hideSpot();
    // 원본과 동일하게 spot 클릭 시 항상 턴 넘김
    nextTurn();
  };

  const handleRestart = () => {
    setShowStartScreen(true);
    setShowEndScreen(false);
    setPlayer1Name("");
    setPlayer2Name("");
    resetGame();
  };

  const handleQuit = () => {
    setShowStartScreen(true);
    setShowEndScreen(false);
    setPlayer1Name("");
    setPlayer2Name("");
    resetGame();
  };

  if (showStartScreen) {
    return (
      <div className="travel-game">
        <div className="start-screen">
          <h2>놀이 참여자 이름을 입력하세요</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="놀이 참여자 1 이름"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
            />
            <input
              type="text"
              placeholder="놀이 참여자 2 이름"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
            />
          </div>
          <button onClick={handleStart} className="start-btn">
            시작하기
          </button>
        </div>
      </div>
    );
  }

  if (showEndScreen) {
    return (
      <div className="travel-game">
        <div className="end-screen">
          <h2>{winner}님이 1바퀴를 돌아 우승했습니다! 🎉</h2>
          <div className="button-group">
            <button onClick={handleRestart} className="restart-btn">
              다시하기
            </button>
            <button onClick={handleQuit} className="quit-btn">
              끝내기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="travel-game">
      <div className="game-container">
        <div className="board-container">
          <GameBoard
            spots={boardSpots}
            players={gameState.players}
            size={600}
          />
          <div className="dice-area">
            <Dice3D
              size="small"
              onRoll={handleDiceRoll}
              disabled={!gameState.gameActive}
            />
            <div className="turn-info">
              현재 차례: {gameState.players[gameState.currentPlayer].name}
            </div>
          </div>
        </div>
      </div>

      {showSpotInfo && currentSpot && (
        <div className="spot-info" onClick={handleSpotClick}>
          <h3>{currentSpot.label}</h3>
        </div>
      )}
    </div>
  );
};

export default TravelGame;
