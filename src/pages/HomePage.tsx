import React from "react";
import { Link } from "react-router-dom";
import { GameConfig, GameType } from "../types/game";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const games: GameConfig[] = [
    {
      title: "배낭여행 놀이",
      description: "주사위를 굴려 세계 여행을 떠나는 보드게임입니다.",
      path: "/travel",
      type: "travel" as any,
    },
    {
      title: "소개하기 게임",
      description: "주사위를 굴려 친구들에게 자신을 소개해보세요.",
      path: "/introduction",
      type: "introduction" as any,
    },
    {
      title: "소개하기 게임 2",
      description: "더 구체적이고 상세한 질문으로 친구들과 대화해보세요.",
      path: "/introduction2",
      type: GameType.INTRODUCTION2,
    },
    {
      title: "단답형 게임",
      description: "주사위를 굴려 -아요/어요 형태의 단어를 말해보세요.",
      path: "/short-answer",
      type: "short-answer" as any,
    },
    {
      title: "문장 만들기",
      description: "두 개의 주사위를 굴려 문장을 만들어보세요.",
      path: "/sentence",
      type: "sentence" as any,
    },
    {
      title: "주사위 굴리기",
      description: "간단한 3D 주사위를 굴려보세요.",
      path: "/dice-only",
      type: "dice-only" as any,
    },
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>🎲 보드게임 모음</h1>
        <p>다양한 주사위 게임을 한 곳에서 즐겨보세요!</p>
      </div>

      <div className="games-grid">
        {games.map((game, index) => (
          <Link key={index} to={game.path} className="game-card">
            <div className="game-icon">
              {game.type === "travel" && "🌍"}
              {game.type === "introduction" && "👋"}
              {game.type === "introduction2" && "💭"}
              {game.type === "short-answer" && "💬"}
              {game.type === "sentence" && "📝"}
              {game.type === "dice-only" && "🎲"}
            </div>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <div className="play-button">게임하기</div>
          </Link>
        ))}
      </div>

      <div className="features-section">
        <h2>게임 특징</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">🎮</div>
            <h3>다양한 게임</h3>
            <p>6가지 다른 주사위 게임을 제공합니다</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎨</div>
            <h3>3D 주사위</h3>
            <p>실제 주사위처럼 굴러가는 3D 애니메이션</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📱</div>
            <h3>반응형 디자인</h3>
            <p>모바일과 데스크톱에서 모두 사용 가능</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
