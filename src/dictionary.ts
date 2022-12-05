import wordList from "./words";
import Trie from "mnemonist/trie";
const wordTrie = Trie.from(wordList);
export default wordTrie;
