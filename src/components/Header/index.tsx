import { Layout, Button } from 'antd';
import styles from './index.less';
import { useDispatch } from 'umi';
import { Link } from 'umi';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const handleSignIn = () => {
    dispatch({
      type: 'user/openSignInForm',
    });
  };
  return (
    <Layout.Header className={styles.header}>
      <Link to="/" className={styles.logo}>
        单词记忆器
      </Link>
      <div className={styles.navigator}></div>
      <div className={styles.user}>
        <Button type="link" onClick={handleSignIn}>
          请登录
        </Button>
      </div>
    </Layout.Header>
  );
};

export default Header;
