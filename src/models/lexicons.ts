import type { Lexicon } from '@/types/lexcion';
import type { EffectsCommandMap } from 'dva';
import type { AnyAction, Reducer } from 'redux';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & {
    select: <T>(func: (state: LexiconsModelState) => T) => T;
  },
) => void;
export interface LexiconsModelState {
  lexiconList: Lexicon[];
  temporary: Lexicon;
}
export interface LexiconsModel {
  namespace: string;
  state: LexiconsModelState;
  effects: Record<string, Effect>;
  reducers: Record<string, Reducer<LexiconsModelState>>;
}

export interface LexiconsModelState {
  lexiconList: Lexicon[];
  temporary: Lexicon;
}

const localTemporary = localStorage.getItem('temporary');

const defaultState = {
  lexiconList: [],
  temporary: localTemporary
    ? JSON.parse(localTemporary)
    : {
        title: '临时词库',
        wordList: [],
      },
};

export const lexiconsModel: LexiconsModel = {
  namespace: 'lexicons',
  state: defaultState,
  reducers: {
    updateLexiconList(
      state: LexiconsModelState = { ...defaultState },
      { payload },
    ) {
      state.lexiconList = payload.lexiconList;
      return state;
    },
    updateTemporary(
      state: LexiconsModelState = { ...defaultState },
      { payload },
    ) {
      localStorage.setItem('temporary', JSON.stringify(payload.temporary));
      state.temporary = payload.temporary;
      return state;
    },
  },
  effects: {
    *getLexiconList({ payload }, { put }) {
      yield put({
        type: 'updateLexiconList',
        payload: {
          lexiconList: payload,
        },
      });
    },
    *importWordsToTemporary({ payload }, { put, select }) {
      const { temporary } = yield select<{ lexicons: LexiconsModelState }>(
        (state) => {
          return state.lexicons;
        },
      );
      const newTemporary = { ...temporary };
      newTemporary.wordList = newTemporary.wordList.concat(payload);
      
      yield put({
        type: 'updateTemporary',
        payload: {
          temporary: newTemporary,
        },
      });
    },
    *addNewWordToTemporary({ payload }, { put, select }) {
      const { temporary } = yield select<{ lexicons: LexiconsModelState }>(
        (state) => {
          return state.lexicons;
        },
      );
      const newTemporary = { ...temporary };
      newTemporary.wordList.push(payload);
      yield put({
        type: 'updateTemporary',
        payload: {
          temporary: newTemporary,
        },
      });
    },
    *deleteWordFromTemporary({ payload }, { put, select }) {
      const { temporary } = yield select<{ lexicons: LexiconsModelState }>(
        (state) => {
          return state.lexicons;
        },
      );
      const newTemporary = { ...temporary };
      newTemporary.wordList.splice(payload, 1);
      yield put({
        type: 'updateTemporary',
        payload: {
          temporary: newTemporary,
        },
      });
    },
    *clearWordsFromTemporary({}, { put, select }) {
      const { temporary } = yield select<{ lexicons: LexiconsModelState }>(
        (state) => {
          return state.lexicons;
        },
      );
      const newTemporary = { ...temporary };
      newTemporary.wordList = [];
      yield put({
        type: 'updateTemporary',
        payload: {
          temporary: newTemporary,
        },
      });
    },
  },
};

export default lexiconsModel;
