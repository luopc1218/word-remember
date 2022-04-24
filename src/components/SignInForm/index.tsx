import { Form, Input, Button } from 'antd';
import type { FormComponentProps } from '../FormModal';
import styles from './index.less';
export interface SignInFormData {}

export const SignInForm: React.FC<FormComponentProps> = ({
  formProps,
  onEvent,
}) => {
  return (
    <div className={styles.signInForm}>
      <div className={styles.title}>欢迎登录单词记忆器</div>
      <Form {...formProps} labelCol={{ span: 6 }}>
        <Form.Item
          label="用户名"
          name="username"
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
            onClick={() => {
              onEvent('signUp');
            }}
          >
            前往注册
          </Button>
        </div>
      </Form>
    </div>
  );
};
