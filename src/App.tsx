import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// 게임 페이지들 import
import HomePage from "./pages/HomePage";
import TravelGame from "./pages/TravelGame";
import IntroductionGame from "./pages/IntroductionGame";
import IntroductionGame2 from "./pages/IntroductionGame2";
import ShortAnswerGame from "./pages/ShortAnswerGame";
import SentenceGame from "./pages/SentenceGame";
import DiceOnlyGame from "./pages/DiceOnlyGame";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🎲 보드게임 모음
            </Link>
            <div className="nav-menu">
              <Link to="/" className="nav-link">
                홈
              </Link>
              <Link to="/travel" className="nav-link">
                배낭여행
              </Link>
              <Link to="/introduction" className="nav-link">
                소개하기
              </Link>
              <Link to="/introduction2" className="nav-link">
                소개하기2
              </Link>
              <Link to="/short-answer" className="nav-link">
                단답형
              </Link>
              <Link to="/sentence" className="nav-link">
                문장만들기
              </Link>
              <Link to="/dice-only" className="nav-link">
                주사위
              </Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/travel" element={<TravelGame />} />
            <Route path="/introduction" element={<IntroductionGame />} />
            <Route path="/introduction2" element={<IntroductionGame2 />} />
            <Route path="/short-answer" element={<ShortAnswerGame />} />
            <Route path="/sentence" element={<SentenceGame />} />
            <Route path="/dice-only" element={<DiceOnlyGame />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
