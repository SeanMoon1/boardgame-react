import { useState, useCallback } from "react";
import { GameState, BoardSpot } from "../types/game";

const initialBoardSpots: BoardSpot[] = [
  { label: "출발!", color: "#4ecdc4" },
  { label: "필리핀\n스쿠버 다이빙", color: "#a8e6cf" },
  { label: "독일\n맥주", color: "#ffd93d" },
  { label: "일본\n생선회", color: "#96ceb4" },
  { label: "태국\n코끼리", color: "#ff9a56" },
  { label: "중국\n만리장성", color: "#45b7d1" },
  { label: "몽골\n말", color: "#ff6b6b" },
  { label: "인도\n요가", color: "#a8e6cf" },
  { label: "러시아\n발레 공연", color: "#ffd93d" },
  { label: "한 번 쉬세요", color: "#e9ecef" },
  { label: "브라질\n삼바 축제", color: "#96ceb4" },
  { label: "이탈리아\n피자", color: "#ff9a56" },
  { label: "이집트\n사막", color: "#45b7d1" },
  { label: "스페인\n박물관", color: "#ff6b6b" },
  { label: "호주\n번지 점프", color: "#a8e6cf" },
  { label: "프랑스\n미술관", color: "#ffd93d" },
  { label: "미국\n놀이공원", color: "#96ceb4" },
  { label: "영국\n축구 경기", color: "#4ecdc4" },
];

export const useTravelGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [
      { name: "", pos: 0, color: "#ff6b6b", lap: 0, skip: false },
      { name: "", pos: 0, color: "#4ecdc4", lap: 0, skip: false },
    ],
    currentPlayer: 0,
    gameActive: false,
    totalSpots: initialBoardSpots.length,
  });

  const [diceState, setDiceState] = useState({
    shuffledNumbers: [] as number[],
    currentIndex: 0,
  });

  const [showSpotInfo, setShowSpotInfo] = useState(false);
  const [currentSpot, setCurrentSpot] = useState<BoardSpot | null>(null);

  const shuffleNumbers = useCallback(() => {
    const shuffled = [1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5);
    setDiceState({
      shuffledNumbers: shuffled,
      currentIndex: 0,
    });
  }, []);

  const startGame = useCallback(
    (player1Name: string, player2Name: string) => {
      setGameState((prev) => ({
        ...prev,
        players: [
          {
            name: player1Name || "놀이 참여자1",
            pos: 0,
            color: "red",
            lap: 0,
            skip: false,
          },
          {
            name: player2Name || "놀이 참여자2",
            pos: 0,
            color: "blue",
            lap: 0,
            skip: false,
          },
        ],
        currentPlayer: 0,
        gameActive: true,
      }));
      // 게임 시작 시 주사위 섞기
      shuffleNumbers();
    },
    [shuffleNumbers]
  );

  const movePlayer = useCallback((steps: number) => {
    setGameState((prev) => {
      const newPlayers = [...prev.players];
      const currentPlayer = newPlayers[prev.currentPlayer];
      const oldPos = currentPlayer.pos;

      currentPlayer.pos = (currentPlayer.pos + steps) % prev.totalSpots;

      if (oldPos + steps >= prev.totalSpots) {
        currentPlayer.lap += 1;
      }

      return {
        ...prev,
        players: newPlayers,
      };
    });
  }, []);

  const rollDice = useCallback((): number => {
    let roll: number;

    setDiceState((prev) => {
      let newShuffled = [...prev.shuffledNumbers];
      let newIndex = prev.currentIndex;

      // 모든 숫자를 사용했으면 다시 섞기
      if (newIndex >= newShuffled.length) {
        newShuffled = [1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5);
        newIndex = 0;
      }

      roll = newShuffled[newIndex];
      newIndex++;

      return {
        shuffledNumbers: newShuffled,
        currentIndex: newIndex,
      };
    });

    // movePlayer 호출
    movePlayer(roll!);
    return roll!;
  }, [movePlayer]);

  const nextTurn = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      currentPlayer: 1 - prev.currentPlayer,
    }));
  }, []);

  const checkGameEnd = useCallback((): boolean => {
    const currentPlayer = gameState.players[gameState.currentPlayer];
    return currentPlayer.lap > 0;
  }, [gameState]);

  const checkSkipTurn = useCallback((): boolean => {
    const currentPlayer = gameState.players[gameState.currentPlayer];
    return currentPlayer.skip;
  }, [gameState]);

  const setSkipTurn = useCallback((skip: boolean) => {
    setGameState((prev) => {
      const newPlayers = [...prev.players];
      newPlayers[prev.currentPlayer].skip = skip;
      return {
        ...prev,
        players: newPlayers,
      };
    });
  }, []);

  const showSpot = useCallback((spot: BoardSpot) => {
    setCurrentSpot(spot);
    setShowSpotInfo(true);
  }, []);

  const hideSpot = useCallback(() => {
    setShowSpotInfo(false);
    setCurrentSpot(null);
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      players: [
        { name: "", pos: 0, color: "red", lap: 0, skip: false },
        { name: "", pos: 0, color: "blue", lap: 0, skip: false },
      ],
      currentPlayer: 0,
      gameActive: false,
      totalSpots: initialBoardSpots.length,
    });
    setDiceState({
      shuffledNumbers: [],
      currentIndex: 0,
    });
    setShowSpotInfo(false);
    setCurrentSpot(null);
  }, []);

  return {
    gameState,
    setGameState,
    boardSpots: initialBoardSpots,
    showSpotInfo,
    currentSpot,
    startGame,
    rollDice,
    nextTurn,
    checkGameEnd,
    checkSkipTurn,
    setSkipTurn,
    showSpot,
    hideSpot,
    resetGame,
    shuffleNumbers,
  };
};
