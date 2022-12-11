import { assert, expect, test } from "vitest";
import { search, searchBoard } from "../src/search";
import Trie from "mnemonist/trie";
import { DIR } from "../src/zus/BoardStore";

test('Simple Row Search', () => {
  const trie = Trie.from(["cat"]);
  const board = Array.from({length: 3}, () => Array.from({length:3}, () => ""));
  board[0][0] = "c";

  const results = [];
  search(board, ["p", "a", "t", "d"], DIR.HORIZONTAL, [], 0, 0, results, trie);

  console.log(results);
  assert(results.length === 1);
  expect(results[0]).eq("cat");
})

test('Simple Column Search', () => {
  const trie = Trie.from(["doge"]);
  const board = Array.from({length: 4}, () => Array.from({length:2}, () => ""));
  board[0][0] = "d";

  const results = [];
  search(board, ["o", "e", "p", "g"], DIR.VERTICAL, [], 0, 0, results, trie);

  assert(results.length === 1);
  expect(results[0]).eq("doge");
})

test('Two row words: one goes to bounds, one before bounds', () => {
  const trie = Trie.from(["cat", "cape", "dog", "cone"]);
  const board = Array.from({length: 3}, () => Array.from({length:4}, () => ""));
  board[0][0] = "c";

  const results = [];
  search(board, ["p", "a", "t", "d", "e"], DIR.HORIZONTAL, [], 0, 0, results, trie);

  expect(results).to.have.members(["cat", "cape"]);
})

test('Not searching empty space before horizontal', () => {
  const trie = Trie.from(["cat", "at"]);
  const board = Array.from({length: 1}, () => Array.from({length:4}, () => ""));
  board[0][1] = "c";
  const words = searchBoard(board, ["c", "a", "t"], trie);
  // At shouldn't be there
  const expected = [{ row: 0, col: 1, direction: DIR.HORIZONTAL, word: "cat" }];
  assert.sameDeepMembers(words, expected);
})

test('Cross Search', () => {
  const trie = Trie.from(["cat", "ct", "at"]);
  const board = Array.from({length: 3}, () => Array.from({length:3}, () => ""));
  board[1][0] = "t";
  board[1][1] = "t";
  const words = searchBoard(board, ["c", "a", "t"], trie);
  console.log(words);
  const expected = [
                    { row: 0, col: 0, direction: DIR.HORIZONTAL, word: "cat" },
                    { row: 0, col: 0, direction: DIR.VERTICAL, word: "ct" },
                    { row: 0, col: 1, direction: DIR.VERTICAL, word: "ct" },
                    { row: 0, col: 1, direction: DIR.VERTICAL, word: "at" },
                    { row: 0, col: 0, direction: DIR.VERTICAL, word: "at" },
                    { row: 0, col: 1, direction: DIR.HORIZONTAL, word: "at" },
                    { row: 0, col: 1, direction: DIR.HORIZONTAL, word: "ct" },
                   ];
  assert.sameDeepMembers(words, expected);
})

test('Cross Search prevents', () => {
  const trie = Trie.from(["tea"]);
  const board = Array.from({length: 3}, () => Array.from({length:3}, () => ""));
  board[1][0] = "t";
  board[1][1] = "t";
  board[1][2] = "t";
  const words = searchBoard(board, ["t", "e", "a"], trie);
  assert(words.length === 0);
})
