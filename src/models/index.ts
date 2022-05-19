import { globalService } from '@/services';
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
  global: GlobalModelState;
  lexicons: LexiconsModelState;
  user: UserModelState;
}

export interface GlobalModelState {
  titlePath: { title: string; path: string }[];
  sysConfig: any;
}

export const globalModel: Model<GlobalModelState> = {
  namespace: 'global',
  state: {
    titlePath: [],
    sysConfig: undefined,
  },
  reducers: {
    setPagePath(state, { payload }) {
      state.titlePath = payload;
      return state;
    },
    setSysConfig(state, { payload }) {
      state.sysConfig = payload;
      return state;
    },
  },
  effects: {
    *setTitle({}, { select }) {
      document.title = yield select((state: ModelMap) => {
        return (
          state.global?.sysConfig?.title +
          (state.global.titlePath.length > 0 ? '-' : '') +
          state.global.titlePath
            .map((item: { path: string; title: string }) => item.title)
            .join('-')
        );
      });
    },
    *getSysConfig({}, { put }) {
      const sysConfig = yield globalService.getSysConfig();
      yield put({
        type: 'setSysConfig',
        payload: sysConfig,
      });
      yield put({
        type: 'setTitle',
      });
    },
    *changePagePath({ payload }, { put }) {
      yield put({
        type: 'setPagePath',
        payload,
      });
      yield put({
        type: 'setTitle',
      });
    },
  },
};

export default globalModel;
