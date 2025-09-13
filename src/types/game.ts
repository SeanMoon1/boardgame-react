// 게임 관련 타입 정의

export interface Player {
  name: string;
  pos: number;
  color: string;
  lap: number;
  skip: boolean;
}

export interface BoardSpot {
  label: string;
  color: string;
}

export interface DiceRotation {
  x: number;
  y: number;
}

export interface DiceDot {
  x: number;
  y: number;
}

export interface GameState {
  players: Player[];
  currentPlayer: number;
  gameActive: boolean;
  totalSpots: number;
}

export interface DiceGameState {
  shuffledNumbers: number[];
  currentIndex: number;
  lastResult: number | null;
}

export interface TwoDiceGameState {
  dice1: DiceGameState;
  dice2: DiceGameState;
}

// 게임 타입 열거형
export enum GameType {
  TRAVEL = "travel",
  INTRODUCTION = "introduction",
  INTRODUCTION2 = "introduction2",
  SHORT_ANSWER = "short-answer",
  SENTENCE = "sentence",
  DICE_ONLY = "dice-only",
}

// 게임 설정 인터페이스
export interface GameConfig {
  title: string;
  description: string;
  path: string;
  type: GameType;
}
