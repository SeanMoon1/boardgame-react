import { useState, useCallback } from "react";
import { DiceGameState } from "../types/game";

export const useDiceGame = () => {
  const [gameState, setGameState] = useState<DiceGameState>({
    shuffledNumbers: [],
    currentIndex: 0,
    lastResult: null,
  });

  const shuffleNumbers = useCallback(() => {
    const shuffled = [1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5);
    setGameState((prev) => ({
      ...prev,
      shuffledNumbers: shuffled,
      currentIndex: 0,
    }));
  }, []);

  const rollDice = useCallback((): number => {
    setGameState((prev) => {
      let newShuffled = [...prev.shuffledNumbers];
      let newIndex = prev.currentIndex;

      // 모든 숫자를 사용했으면 다시 섞기
      if (newIndex >= newShuffled.length) {
        newShuffled = [1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5);
        newIndex = 0;
      }

      const result = newShuffled[newIndex];
      newIndex++;

      return {
        shuffledNumbers: newShuffled,
        currentIndex: newIndex,
        lastResult: result,
      };
    });

    return (
      gameState.shuffledNumbers[gameState.currentIndex] ||
      [1, 2, 3, 4, 5, 6][Math.floor(Math.random() * 6)]
    );
  }, [gameState]);

  const resetGame = useCallback(() => {
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
