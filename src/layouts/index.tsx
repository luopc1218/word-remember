import styles from './index.less';
import { useHistory, Link } from 'umi';
import { Button, Affix } from 'antd';

export const LayoutContainer = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
      <Link to="/">
        <Button type="link">返回主页</Button>
      </Link>
      {children}
    </div>
  );
};

export default LayoutContainer;
