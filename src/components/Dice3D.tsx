import React, { useEffect, useRef, useCallback } from "react";
import "./Dice3D.css";

// 각 눈(1~6)에 해당하는 색상 - 부드럽고 현대적인 색상
const dotColors = [
  "#ff6b6b", // 1: 부드러운 빨강
  "#ff9a56", // 2: 따뜻한 오렌지
  "#ffd93d", // 3: 밝은 노랑
  "#4ecdc4", // 4: 청록색
  "#45b7d1", // 5: 하늘색
  "#96ceb4", // 6: 민트색
];

interface Dice3DProps {
  size?: "small" | "medium" | "large";
  onRoll?: (result: number) => void;
  disabled?: boolean;
  className?: string;
}

const Dice3D: React.FC<Dice3DProps> = ({
  size = "medium",
  onRoll,
  disabled = false,
  className = "",
}) => {
  const diceRef = useRef<HTMLDivElement>(null);

  // 각 눈에 해당하는 3D 회전값
  const dice3dRotations = [
    { x: 0, y: 0 }, // 1 (front)
    { x: 90, y: 0 }, // 2 (bottom)
    { x: 0, y: -90 }, // 3 (right)
    { x: 0, y: 90 }, // 4 (left)
    { x: -90, y: 0 }, // 5 (top)
    { x: 0, y: 180 }, // 6 (back)
  ];

  // 주사위 눈 점 위치 (크기별)
  const getDiceDots = (diceSize: number) => [
    [[diceSize / 2, diceSize / 2]],
    [
      [diceSize / 4, diceSize / 4],
      [(diceSize * 3) / 4, (diceSize * 3) / 4],
    ],
    [
      [diceSize / 4, diceSize / 4],
      [diceSize / 2, diceSize / 2],
      [(diceSize * 3) / 4, (diceSize * 3) / 4],
    ],
    [
      [diceSize / 4, diceSize / 4],
      [diceSize / 4, (diceSize * 3) / 4],
      [(diceSize * 3) / 4, diceSize / 4],
      [(diceSize * 3) / 4, (diceSize * 3) / 4],
    ],
    [
      [diceSize / 4, diceSize / 4],
      [diceSize / 4, (diceSize * 3) / 4],
      [diceSize / 2, diceSize / 2],
      [(diceSize * 3) / 4, diceSize / 4],
      [(diceSize * 3) / 4, (diceSize * 3) / 4],
    ],
    [
      [diceSize / 4, diceSize / 4],
      [diceSize / 4, diceSize / 2],
      [diceSize / 4, (diceSize * 3) / 4],
      [(diceSize * 3) / 4, diceSize / 4],
      [(diceSize * 3) / 4, diceSize / 2],
      [(diceSize * 3) / 4, (diceSize * 3) / 4],
    ],
  ];

  const getSizeValue = () => {
    switch (size) {
      case "small":
        return 80;
      case "large":
        return 400;
      default:
        return 250;
    }
  };

  const diceSize = getSizeValue();
  const dotSize = diceSize * 0.25; // 원본보다 조금 더 크게 조정

  const setDiceFaceDots = useCallback(() => {
    if (!diceRef.current) return;

    const faces = ["front", "back", "right", "left", "top", "bottom"];
    const diceDots = getDiceDots(diceSize);

    diceRef.current.querySelectorAll(".face").forEach((face, idx) => {
      face.innerHTML = "";
      let dots: number[][];
      let color: string;

      switch (faces[idx]) {
        case "front":
          dots = diceDots[0];
          color = dotColors[0];
          break; // 1
        case "back":
          dots = diceDots[5];
          color = dotColors[5];
          break; // 6
        case "right":
          dots = diceDots[2];
          color = dotColors[2];
          break; // 3
        case "left":
          dots = diceDots[3];
          color = dotColors[3];
          break; // 4
        case "top":
          dots = diceDots[4];
          color = dotColors[4];
          break; // 5
        case "bottom":
          dots = diceDots[1];
          color = dotColors[1];
          break; // 2
        default:
          dots = [];
          color = "#222";
      }

      dots.forEach(([cx, cy]) => {
        const dot = document.createElement("div");
        dot.className = "dot";
        dot.style.left = cx - dotSize / 2 + "px";
        dot.style.top = cy - dotSize / 2 + "px";
        dot.style.width = dotSize + "px";
        dot.style.height = dotSize + "px";
        dot.style.background = color;
        face.appendChild(dot);
      });
    });
  }, [diceSize, dotSize]);

  useEffect(() => {
    setDiceFaceDots();
  }, [size, setDiceFaceDots]);

  const rollDice = () => {
    if (disabled || !diceRef.current) return;

    // 1~6 랜덤 숫자
    const roll = Math.floor(Math.random() * 6) + 1;

    // 3D 회전 애니메이션 - 최소 3바퀴 이상 돌도록 일관성 있게 설정
    const extraX = 360 * (3 + Math.floor(Math.random() * 3)); // 3~5바퀴
    const extraY = 360 * (3 + Math.floor(Math.random() * 3)); // 3~5바퀴
    const rot = dice3dRotations[roll - 1];

    diceRef.current.style.transform = `rotateX(${rot.x + extraX}deg) rotateY(${
      rot.y + extraY
    }deg)`;

    // 결과 콜백 호출
    if (onRoll) {
      setTimeout(() => {
        onRoll(roll);
      }, 1000);
    }
  };

  return (
    <div
      ref={diceRef}
      className={`dice dice-${size} ${className} ${disabled ? "disabled" : ""}`}
      onClick={rollDice}
      style={{ width: diceSize, height: diceSize }}
    >
      <div className="face front"></div>
      <div className="face back"></div>
      <div className="face right"></div>
      <div className="face left"></div>
      <div className="face top"></div>
      <div className="face bottom"></div>
    </div>
  );
};

export default Dice3D;
