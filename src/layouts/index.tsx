import styles from './index.less';
import { FixedMenu } from '@/components';

export const LayoutContainer = (props) => {
  const { children } = props;
  return (
    <div className={styles.layoutContainer}>
      {children}
      <FixedMenu />
    </div>
  );
};

export default LayoutContainer;
