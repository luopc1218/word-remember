export * from './user';
export * from './lexcion';

export interface ResponseList<T> {
  list: T[];
  totalCount: number;
}
