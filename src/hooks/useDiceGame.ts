import { useState, useCallback, useRef } from "react";
import { DiceGameState } from "../types/game";

export const useDiceGame = () => {
  const [gameState, setGameState] = useState<DiceGameState>({
    shuffledNumbers: [],
    currentIndex: 0,
    lastResult: null,
  });

  // ref를 사용해서 동기적으로 상태를 추적
  const stateRef = useRef({
    shuffledNumbers: [] as number[],
    currentIndex: 0,
  });

  const shuffleNumbers = useCallback(() => {
    const shuffled = [1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5);
    stateRef.current = {
      shuffledNumbers: shuffled,
      currentIndex: 0,
    };
    setGameState((prev) => ({
      ...prev,
      shuffledNumbers: shuffled,
      currentIndex: 0,
    }));
  }, []);

  const rollDice = useCallback((): number => {
    let newShuffled = [...stateRef.current.shuffledNumbers];
    let newIndex = stateRef.current.currentIndex;

    // 첫 번째 주사위 굴리기이거나 모든 숫자를 사용했으면 1~6을 섞기
    if (newShuffled.length === 0 || newIndex >= newShuffled.length) {
      newShuffled = [1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5);
      newIndex = 0;
    }

    const result = newShuffled[newIndex];
    newIndex++;

    // ref와 state 모두 업데이트
    stateRef.current = {
      shuffledNumbers: newShuffled,
      currentIndex: newIndex,
    };

    setGameState({
      shuffledNumbers: newShuffled,
      currentIndex: newIndex,
      lastResult: result,
    });

    return result;
  }, []);

  const resetGame = useCallback(() => {
    stateRef.current = {
      shuffledNumbers: [],
      currentIndex: 0,
    };
    setGameState({
      shuffledNumbers: [],
      currentIndex: 0,
      lastResult: null,
    });
  }, []);

  return {
    gameState,
    rollDice,
    shuffleNumbers,
    resetGame,
  };
};
