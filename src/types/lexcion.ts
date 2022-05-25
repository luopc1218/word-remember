export interface Word {
  id: number;
  lexiconsId: number;
  original: string;
  phonetic: string;
  meaning: string;
}

export interface Lexicon {
  id: number;
  name: string;
  onwerId: number;
  cover: string;
  description: string;
  type: 0 | 1 | 2;
}
