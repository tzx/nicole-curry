import defaultWordTrie from "./dictionary";
import { DIR } from "./zus/BoardStore";

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
  wordTrie = defaultWordTrie,
) => {
  const buildString = build.join("");
  if (row >= board.length || col >= board[0].length) {
    if (wordTrie.has(buildString)) {
      results.push(buildString);
    }
    return;
  }

  if (wordTrie.find(buildString).length === 0) {
    return;
  }

  if (board[row][col] === "") {
    if (wordTrie.has(buildString)) {
      results.push(buildString);
    }
  }

  const [newRow, newCol] = newRowCol(row, col, direction);

  if (board[row][col] !== "") {
    // continue searching
    build.push(board[row][col]);
    search(board, letters, direction, build, newRow, newCol, results, wordTrie);
    build.pop();
    return;
  }

  for (let i = 0; i < letters.length; i++) {
    const char = letters[i];
    const rest = [...letters.slice(0, i), ...letters.slice(i + 1)];
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
      wordTrie
    );
    build.pop();
    board[row][col] = "";
  }
}
