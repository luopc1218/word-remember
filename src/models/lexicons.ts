import type { Lexicon } from '@/types/lexcion';
import type { Model, ModelMap } from './index';

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

export const lexiconsModel: Model<LexiconsModelState> = {
  namespace: 'lexicons',
  state: defaultState,
  reducers: {
    // 更新词库
    updateLexiconList(
      state: LexiconsModelState = { ...defaultState },
      { payload },
    ) {
      state.lexiconList = payload.lexiconList;
      return state;
    },
    // 更新临时词库
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
    // 获取词库列表
    *updateLexiconList({ payload }, { put }) {
      yield put({
        type: 'updateLexiconList',
        payload: {
          lexiconList: payload,
        },
      });
    },
    // 导入单词到临时词库
    *importWordsToTemporary({ payload }, { put, select }) {
      const { temporary } = yield select((state: ModelMap) => {
        return state.lexicons;
      });
      const newTemporary = { ...temporary };
      newTemporary.wordList = newTemporary.wordList.concat(payload);

      yield put({
        type: 'updateTemporary',
        payload: {
          temporary: newTemporary,
        },
      });
    },
    // 添加新单词到临时词库
    *addNewWordToTemporary({ payload }, { put, select }) {
      const { temporary } = yield select((state: ModelMap) => {
        return state.lexicons;
      });
      const newTemporary = { ...temporary };
      newTemporary.wordList.push(payload);
      yield put({
        type: 'updateTemporary',
        payload: {
          temporary: newTemporary,
        },
      });
    },
    // 从临时词库删除单词
    *deleteWordFromTemporary({ payload }, { put, select }) {
      const { temporary } = yield select((state: ModelMap) => {
        return state.lexicons;
      });
      const newTemporary = { ...temporary };
      newTemporary.wordList.splice(payload, 1);
      yield put({
        type: 'updateTemporary',
        payload: {
          temporary: newTemporary,
        },
      });
    },
    // 清空临时词库
    *cleanTemporary({}, { put, select }) {
      const { temporary } = yield select((state: ModelMap) => {
        return state.lexicons;
      });
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
