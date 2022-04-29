import type { Model } from './index';
import type { User } from '@/types/user';
import { UserService } from '@/services/user';

export interface UserModelState {
  getUserInfoLoading: boolean;
  userInfo: User | undefined;
}

export const userModel: Model<UserModelState> = {
  namespace: 'user',
  state: {
    getUserInfoLoading: true,
    userInfo: undefined,
  },
  reducers: {
    setUserInfo(state, payload) {
      return { ...state, getUserInfoLoading: payload }

    },
    setGetUserInfoLoading(state, payload) {
      return { ...state, userInfo: payload }
    }
  },
  effects: {
    *signIn({ payload }, { put }) {
      const { signInFormData, reslove, reject } = payload;
      try {
        const asseccToken = yield UserService.signIn(signInFormData);
        reslove();
        yield put({
          type: 'getUserInfo',
          payload: {
            asseccToken,
          },
        });
      } catch (e) {
        reject()
      }
    },
    *signUp({ payload }) {
      const { signUpFormData, reslove, reject } = payload;
      try {
        yield UserService.signUp(signUpFormData);
        reslove();
      } catch (e) {
        reject()
      }
    },
    *getUserInfo({ }, { put }) {
      try {
        yield put({
          type: 'setGetUserInfoLoading',
          payload: true
        })
        const userInfo = yield UserService.getUserInfo();
        yield put({
          type: 'setUserInfo',
          payload: userInfo
        })
        yield put({
          type: 'setGetUserInfoLoading',
          payload: false
        })
      } catch (error) {
        yield put({
          type: 'setUserInfo',
          payload: undefined
        })
        yield put({
          type: 'setGetUserInfoLoading',
          payload: false
        })
      }
    },
  },
};

export default userModel;
