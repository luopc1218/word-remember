import { Form, Input, Button } from 'antd';
import type { FormComponentProps, SignUpFormData } from '..';
import { FormModal, SignUpForm } from '..';
import styles from './index.less';
import { useDispatch } from 'umi';

export interface SignInFormData {
  name: string;
  password: string;
}

export const SignInForm: React.FC<FormComponentProps> = ({ formProps }) => {
  const dispatch = useDispatch();

  const openSignUpForm = () => {
    FormModal.open<SignUpFormData>(
      SignUpForm,
      (signUpFormData, reslove, reject) => {
        dispatch({
          type: 'user/signUp',
          payload: {
            signUpFormData,
            reslove,
            reject,
          },
        });
      },
      {
        title: null,
        icon: null,
        okText: '立即注册',
        closable: true,
      },
      'signUpForm',
    );
  };

  return (
    <div className={styles.signInForm}>
      <div className={styles.title}>欢迎登录单词记忆器</div>
      <Form {...formProps} labelCol={{ span: 6 }}>
        <Form.Item
          label="用户名"
          name="name"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input placeholder="请输入密码" type="password" />
        </Form.Item>
        <div className={styles.signUpText}>
          没有账号？
          <Button
            type="link"
            className={styles.button}
            onClick={openSignUpForm}
          >
            前往注册
          </Button>
        </div>
      </Form>
    </div>
  );
};
