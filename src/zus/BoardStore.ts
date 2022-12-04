import create from "zustand"

const DEFAULT_NUM_ROWS = 5;
const DEFAULT_NUM_COLS = 5;

export enum DIR {
  VERTICAL,
  HORIZONTAL,
}

type BoardStore = {
  direction: DIR;
  board: string[][];
  row: number;
  col: number;
  numRows: number;
  numCols: number;
  setBoard: (key: string) => void;
  setDirection: (dir: DIR) => void;
  setFocusedCell: (row: number, col: number) => void;
  setBoardSize: (numRows: number, numCols: number) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  row: 0,
  col: 0,
  numRows: DEFAULT_NUM_ROWS,
  numCols: DEFAULT_NUM_COLS,
  direction: DIR.HORIZONTAL,
  board: Array.from({ length: DEFAULT_NUM_ROWS }, () => Array.from({ length: DEFAULT_NUM_COLS }, () => "")),
  setBoard: (key: string) => {
    set((state) => {
      const newBoard = state.board.map(row => row.slice())
      newBoard[state.row][state.col] = key
      if (key == "") {
        return ({ board: newBoard })
      }
      // new direction
      const newCell = state.direction == DIR.VERTICAL ? { row: Math.min(state.row + 1, state.numRows - 1) }
                                                      : { col: Math.min(state.col + 1, state.numCols - 1) }
      return ({ board: newBoard, ...newCell })
    })
  },
  setDirection: (dir) => set(({ direction: dir })),
  setFocusedCell: (row, col) => set({ row, col }),
  setBoardSize: (numRows, numCols) => {
    const board = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => ""));
    set(({ board, numRows, numCols, row: 0, col: 0, direction: DIR.HORIZONTAL }));
  }
}))
