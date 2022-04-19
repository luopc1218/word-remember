import { Layout, Button } from 'antd';
import styles from './index.less';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'umi';

export const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <div className={styles.logo}>单词记忆器</div>
      <div className={styles.navigator}></div>
      <div className={styles.user}>
        <Button type="link">请登录</Button>
        {/* <Avatar icon={<UserOutlined />} className={styles.avatar}></Avatar> */}
      </div>
    </Layout.Header>
  );
};

export default Header;
