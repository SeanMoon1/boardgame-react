import React, { useRef, useEffect, useCallback } from "react";
import { BoardSpot, Player } from "../types/game";
import "./GameBoard.css";

interface GameBoardProps {
  spots: BoardSpot[];
  players: Player[];
  size?: number;
}

const GameBoard: React.FC<GameBoardProps> = ({
  spots,
  players,
  size = 600,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBoard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.4;

    // 보드 칸 그리기
    for (let i = 0; i < spots.length; i++) {
      const angle = ((2 * Math.PI) / spots.length) * i - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);

      // 칸 배경
      ctx.beginPath();
      ctx.arc(x, y, 50, 0, 2 * Math.PI);
      ctx.fillStyle = spots[i].color;
      ctx.fill();
      ctx.strokeStyle = "#888";
      ctx.stroke();

      // 텍스트
      ctx.fillStyle = "#222";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const lines = spots[i].label.split("\n");
      for (let j = 0; j < lines.length; j++) {
        ctx.fillText(lines[j], x, y - 10 + j * 18);
      }
    }

    // 말 그리기
    for (let p = 0; p < players.length; p++) {
      const pos = players[p].pos;
      const angle = ((2 * Math.PI) / spots.length) * pos - Math.PI / 2;
      const x = cx + (r - 30) * Math.cos(angle) + (p === 0 ? -10 : 10);
      const y = cy + (r - 30) * Math.sin(angle) + (p === 0 ? -10 : 10);

      ctx.beginPath();
      ctx.arc(x, y, 12, 0, 2 * Math.PI);
      ctx.fillStyle = players[p].color;
      ctx.fill();
      ctx.strokeStyle = "#333";
      ctx.stroke();

      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText(players[p].name[0] || (p + 1).toString(), x, y);
    }
  }, [spots, players, size]);

  useEffect(() => {
    drawBoard();
  }, [spots, players, size, drawBoard]);

  return (
    <div className="game-board-container">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="game-board"
      />
    </div>
  );
};

export default GameBoard;
