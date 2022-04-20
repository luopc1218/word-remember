import { Layout, Button } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import { Link } from 'umi';

export interface HeaderDispatchToProps {
  handleSignIn: () => void;
}
export interface HeaderProps extends HeaderDispatchToProps {}

export const Header = connect<{}, HeaderDispatchToProps>(null, (dispatch) => {
  return {
    handleSignIn() {
      dispatch({
        type: 'user/openSignInForm',
      });
    },
  };
})(({ handleSignIn }: HeaderProps) => {
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
});

export default Header;
