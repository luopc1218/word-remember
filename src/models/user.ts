import type { Model } from './index';
import { FormModal, SignInForm, SignUpForm } from '@/components';
import type { SignInFormData, SignUpFormData } from '@/components';
import type { User } from '@/types/user';
import request from '@/tools/request';
import { apis } from '@/tools/apis';

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
    openSignInForm({ }, { }) {
      console.log('openSignInForm');
      FormModal.open<SignInFormData>(
        SignInForm,
        (SignInFormData) => {
          return request(apis.signIn, SignInFormData);
        },
        {
          title: null,
          icon: null,
          okText: '立即登录',
          closable: true,
        },
        'signInForm',
      );
    },
    openSignUpForm() {
      console.log('openSignUpForm');
      FormModal.open<SignUpFormData>(
        SignUpForm,
        (signUpFormData) => {
          return request(apis.signUp, signUpFormData);
        },

        {
          title: null,
          icon: null,
          okText: '立即注册',
          closable: true,
        },
        'signUpForm',
      );
    },
  },
};

export default userModel;
