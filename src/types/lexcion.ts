export interface Word {
  word: string;
  phonetic: string;
  meaning: string;
}

export interface Lexicon {
  title: string;
  wordList: Word[];
}
