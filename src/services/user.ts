import request from '@/utils/request';
import apis from '@/utils/apis';
import type { SignInFormData, SignUpFormData } from '@/components';
import { md5Object } from '@/utils';
import type { Service } from './index';

export const UserService: Service = {
  // 登录
  async signIn(signUpFormData: SignInFormData): Promise<string> {
    const token = await request(
      apis.signIn,
      md5Object(signUpFormData, ['password']),
      {
        showSuccessMessage: true,
      },
    );
    localStorage.setItem('accessToken', token);
    return token;
  },
  // 注册
  async signUp(signUpFormData: SignUpFormData): Promise<boolean> {
    const { checkPassword, ...signUpFormDataWithoutCheckPassword } =
      signUpFormData;
    await request(
      apis.signUp,
      md5Object(signUpFormDataWithoutCheckPassword, ['password']),
      {
        showSuccessMessage: true,
      },
    );
    return true;
  },
  // 获取用户信息
  async checkSignIn(): Promise<any> {
    const userInfo = await request(apis.checkSignIn, undefined, {
      showErrorMessage: false,
    });
    return userInfo;
  },
};
