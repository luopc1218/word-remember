import type { Model } from './index';
import { FormModal, SignInForm } from '@/components';
import type { SignInFormData } from '@/components';
import type { User } from '@/types/user';

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
    async openSignInForm() {
      try {
        const SignInFormData = await FormModal.open<SignInFormData>(
          SignInForm,
          {
            title: null,
            icon: null,
            okText: '立即登录',
            closable: true,
          },
          'signInForm',
        );
        console.log(SignInFormData);
      } catch (error) {}
    },
    async openSignUpForm() {
      try {
        const SignUpFormData = await FormModal.open<SignInFormData>(
          SignInForm,
          {
            title: null,
            icon: null,
            okText: '立即注册',
            closable: true,
          },
          'signUpForm',
        );
        console.log(SignUpFormData);
      } catch (error) {}
    },
  },
};

export default userModel;
