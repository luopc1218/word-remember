import { lexiocnService } from '@/services/lexiocn';
import type { Lexicon } from '@/types/lexcion';
import type { Model } from './index';

export interface LexiconsModelState {
  getLexiconListLoading: boolean;
  lexiconList: Lexicon[];
}
export const lexiconsModel: Model<LexiconsModelState> = {
  namespace: 'lexicons',
  state: {
    getLexiconListLoading: false,
    lexiconList: [],
  },
  reducers: {
    // 更新词库
    setLexiconList(state: LexiconsModelState, { payload }) {
      state.lexiconList = payload;
      return state;
    },
  },
  effects: {
    *getLexiconList({}, { put }) {
      const lexiconsList = yield lexiocnService.getLexiconList();
      yield put({
        type: 'setLexiconList',
        payload: lexiconsList,
      });
    },
  },
};

export default lexiconsModel;
