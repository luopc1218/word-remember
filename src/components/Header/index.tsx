import { Layout, Button } from 'antd';
import styles from './index.less';
import { useDispatch } from 'umi';
import { Link } from 'umi';
import type { SignInFormData } from '../FormModal';
import { FormModal, SignInForm } from '../FormModal';


export const Header: React.FC = () => {
  const dispatch = useDispatch();


  const openSignInForm = () => {
    FormModal.open<SignInFormData>(
      SignInForm,
      (signInFormData, reslove, reject) => dispatch({
        type: 'user/signIn',
        payload: {
          signInFormData, reslove, reject
        }
      }),
      {
        title: null,
        icon: null,
        okText: '立即登录',
        closable: true,
      },
      'signInForm',
    );
  };

  return (
    <Layout.Header className={styles.header}>
      <Link to="/" className={styles.logo}>
        单词记忆器
      </Link>
      <div className={styles.navigator}></div>
      <div className={styles.user}>
        <Button type="link" onClick={openSignInForm}>
          请登录
        </Button>
      </div>
    </Layout.Header>
  );
};

export default Header;
