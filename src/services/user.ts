import request from '@/tools/request';
import apis from '@/tools/apis';
import type { SignInFormData, SignUpFormData } from '@/components';
import { md5Object } from '@/tools';
import type { Service } from './index';
import { message } from 'antd';

export const UserService: Service = {
  // 登录
  async signIn(signUpFormData: SignInFormData) {
    const token = await request(
      apis.signIn,
      md5Object(signUpFormData, ['password']),
    );
    localStorage.setItem('accessToken', token);
    message.success('登录成功');
    return token;
  },
  // 注册
  async signUp(signUpFormData: SignUpFormData) {
    const { checkPassword, ...signUpFormDataWithoutCheckPassword } =
      signUpFormData;
    await request(
      apis.signUp,
      md5Object(signUpFormDataWithoutCheckPassword, ['password']),
    );
    message.success('注册成功');
  },
};
