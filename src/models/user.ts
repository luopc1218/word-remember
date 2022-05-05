import type { Model } from './index';
import type { User } from '@/types/user';
import { UserService } from '@/services/user';

export interface UserModelState {
  checkSignInLoading: boolean;
  userInfo: User | undefined;
}

export const userModel: Model<UserModelState> = {
  namespace: 'user',
  state: {
    checkSignInLoading: false,
    userInfo: undefined,
  },
  reducers: {
    setUserInfo(state, { payload }) {
      return { ...state, userInfo: payload };
    },
    setCheckSignInLoading(state, { payload }) {
      return { ...state, checkSignInLoading: payload };
    },
  },
  effects: {
    *signIn({ payload }, { put }) {
      const { signInFormData, reslove, reject } = payload;
      try {
        const asseccToken = yield UserService.signIn(signInFormData);
        reslove();
        yield put({
          type: 'checkSignIn',
          payload: {
            asseccToken,
          },
        });
      } catch (e) {
        reject();
      }
    },
    *signUp({ payload }) {
      const { signUpFormData, reslove, reject } = payload;
      try {
        yield UserService.signUp(signUpFormData);
        reslove();
      } catch (e) {
        reject();
      }
    },
    *checkSignIn({}, { put }) {
      try {
        yield put({
          type: 'setCheckSignInLoading',
          payload: true,
        });
        const userInfo = yield UserService.checkSignIn();

        yield put({
          type: 'setUserInfo',
          payload: userInfo,
        });
        yield put({
          type: 'setCheckSignInLoading',
          payload: false,
        });
      } catch (error) {
        yield put({
          type: 'setUserInfo',
          payload: undefined,
        });
        yield put({
          type: 'setCheckSignInLoading',
          payload: false,
        });
      }
    },
  },
};

export default userModel;
