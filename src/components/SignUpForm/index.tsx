import { Form } from 'antd';
import type { FormComponentProps } from '../FormModal';
import styles from './index.less';

export interface SignUpFormData {}

export const SignUpForm: React.FC<FormComponentProps> = ({ formProps }) => {
  return (
    <div className={styles.signUpForm}>
      <div className={styles.title}>欢迎注册单词记忆器</div>
      <Form {...formProps} labelCol={{ span: 6 }}></Form>
    </div>
  );
};
