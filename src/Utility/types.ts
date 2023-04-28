export type GridItem = {
    id: number;
    revealed: boolean;
    value?: number;
    type?: "multiplier_low" | "multiplier_mid" | "multiplier_high" | "free_games" | "clock" | "red_flag";
  };
  

export type ChessGameState = {
    grid: GridItem[][];
    winBalance: number;
    betAmount: number;
    playerBalance: number;
    clocks: number;
    freeGames: number;
    playing: boolean;
    win: number;
    winMultiplier: number;
};

export type ChessGameAction =
    | { type: "SET_GRID"; payload: GridItem[][] }
    | { type: "SET_WIN_BALANCE"; payload: number }
    | { type: "SET_PLAYER_BALANCE"; payload: number }
    | { type: "REVEAL_ITEM"; payload: GridItem }


