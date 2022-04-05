import styles from './index.less';
import { Link } from 'umi';
import { Button } from 'antd';

export const LayoutContainer = (props) => {
  const { children } = props;
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
