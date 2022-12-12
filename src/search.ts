import defaultWordTrie from "./dictionary";
import { DIR } from "./zus/BoardStore";

interface SearchResult {
  row: number,
  col: number,
  direction: DIR,
  word: string,
}

interface CanBePlacedConfig {
  // Touches a cell that has been placed before
  collides: boolean,
  // Uses a letter from your source of letters
  usesLetter: boolean,
}

// Returns res = [boolean, boolean] where res[0] returns whether it's a valid placement
// and res[1] determines if we are using more than one letter to check if it's an actual collision
const validCross = (
  board: string[][],
  row: number,
  col: number,
  direction: DIR,
  char: string,
  wordTrie = defaultWordTrie,
) => {
  // Use the opposite direction
  const dirChange = direction === DIR.VERTICAL ? [0, 1] : [1, 0];
  const prev = [];
  while (row - dirChange[0] >= 0 && col - dirChange[1] >= 0 && board[row - dirChange[0]][col - dirChange[1]] !== "") {
    row = row - dirChange[0];
    col = col - dirChange[1];
    prev.push(board[row][col]);
  }
  const forward = [];
  while (row + dirChange[0] < board.length && col + dirChange[1] < board[0].length && board[row + dirChange[0]][col + dirChange[1]] !== "") {
    row = row + dirChange[0];
    col = col + dirChange[1];
    forward.push(board[row][col]);
  }
  const word = [...prev.reverse(), char, ...forward].join("");
  if (word.length == 1) {
    return [true, false];
  }

  // TODO: update score
  return [wordTrie.has(word), true];
}

const newRowCol = (row: number, col: number, direction: DIR) => {
  if (direction == DIR.VERTICAL) {
    return [row + 1, col];
  }
  return [row, col + 1];
}

export const search = (
  board: string[][],
  letters: string[],
  direction: DIR,
  build: string[] = [],
  row: number,
  col: number,
  results: string[],
  canBePlaced: CanBePlacedConfig,
  wordTrie = defaultWordTrie,
) => {
  const buildString = build.join("");
  if (row >= board.length || col >= board[0].length) {
    if (wordTrie.has(buildString) && Object.values(canBePlaced).every(x => x)) {
      results.push(buildString);
    }
    return;
  }

  if (wordTrie.find(buildString).length === 0) {
    return;
  }

  if (board[row][col] === "") {
    if (wordTrie.has(buildString) && Object.values(canBePlaced).every(x => x)) {
      results.push(buildString);
    }
  }

  const [newRow, newCol] = newRowCol(row, col, direction);

  if (board[row][col] !== "") {
    // continue searching
    build.push(board[row][col]);
    search(board, letters, direction, build, newRow, newCol, results, {...canBePlaced, collides: true }, wordTrie);
    build.pop();
    return;
  }

  for (let i = 0; i < letters.length; i++) {
    const char = letters[i];
    const rest = [...letters.slice(0, i), ...letters.slice(i + 1)];
    const [validPlacement, collidesWord] = validCross(board, row, col, direction, char, wordTrie);
    if (!validPlacement) {
      continue;
    }
    board[row][col] = char;
    build.push(char);
    search(
      board,
      rest,
      direction,
      build,
      newRow,
      newCol,
      results,
      { collides: collidesWord || canBePlaced["collides"], usesLetter: true },
      wordTrie
    );
    build.pop();
    board[row][col] = "";
  }
}

export const searchBoard = (
  board: string[][],
  letters: string[],
  wordTrie = defaultWordTrie,
) => {
  const words: SearchResult[] = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      if (r === 0 || board[r-1][c] == "") {
        const vertResult: string[] = [];
        search(board, letters, DIR.VERTICAL, [], r, c, vertResult, { usesLetter: false, collides: false }, wordTrie);
        const vr = vertResult.map((word) => {
          return {
            row: r,
            col: c,
            direction: DIR.VERTICAL,
            word,
          }
        });
        words.push(...vr);
      }
      if (c === 0 || board[r][c-1] == "") {
        const horResult: string[] = [];
        search(board, letters, DIR.HORIZONTAL, [], r, c, horResult, { collides: false, usesLetter: false }, wordTrie);
        const hr = horResult.map((word) => {
          return {
            row: r,
            col: c,
            direction: DIR.HORIZONTAL,
            word,
          }
        });
        words.push(...hr);
      }
    }
  }
  return words;
};
