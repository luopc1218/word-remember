export interface Word {
  word: string;
  phonetic: string;
  meaning: string;
}

export interface Lexicon {
  id: number;
  name: string;
  ownerId: number;
  cover: string;
  description: string;
}
