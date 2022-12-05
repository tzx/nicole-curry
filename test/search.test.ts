import { assert, expect, test } from "vitest";
import { search } from "../src/search";
import Trie from "mnemonist/trie";
import { DIR } from "../src/zus/BoardStore";

test('Simple Row Search', () => {
  const trie = Trie.from(["cat"]);
  const board = Array.from({length: 3}, () => Array.from({length:3}, () => ""));
  board[0][0] = "c";

  const results = [];
  search(board, ["p", "a", "t", "d"], DIR.HORIZONTAL, [], 0, 0, results, trie);

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

test ('Two row words: one goes to bounds, one before bounds', () => {
  const trie = Trie.from(["cat", "cape", "dog", "cone"]);
  const board = Array.from({length: 3}, () => Array.from({length:4}, () => ""));
  board[0][0] = "c";

  const results = [];
  search(board, ["p", "a", "t", "d", "e"], DIR.HORIZONTAL, [], 0, 0, results, trie);

  expect(results).to.have.members(["cat", "cape"]);
})
