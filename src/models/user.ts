import type { Model } from './index';
import { FormModal, SignInForm, SignUpForm } from '@/components';
import type { SignInFormData, SignUpFormData } from '@/components';
import type { User } from '@/types/user';
import { UserService } from '@/services/user';

export interface UserModelState {
  userInfo: User | undefined;
}

export const userModel: Model<UserModelState> = {
  namespace: 'user',
  state: {
    userInfo: undefined,
  },
  reducers: {},
  effects: {
    async *signIn({ payload }, { call, put }) {
      const { SignInFormData, reslove, reject } = payload;
      const asseccToken = yield call(UserService.signIn, SignInFormData);
      yield put({
        type: 'user/updateUserInfo',
        payload: {
          asseccToken,
        },
      });
      yield call(reslove);
    },

    async updateUserInfo() {
      const userInfo = await UserService.getUserInfo();
    },
  },
};

export default userModel;
