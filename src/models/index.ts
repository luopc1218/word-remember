import type { ImmerReducer, Effect } from 'umi';
import type { LexiconsModelState } from './lexicons';
import type { UserModelState } from './user';

export interface Model<T> {
  namespace?: string;
  state?: T;
  effects?: Record<string, Effect>;
  reducers?: Record<string, ImmerReducer<T>>;
}

export interface ModelMap {
  lexicons: LexiconsModelState;
  user: UserModelState;
}
