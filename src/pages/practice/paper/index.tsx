import { useUrlParams } from '@/hooks';
import styles from './index.less';
import { Divider, Space } from 'antd';

export const Paper = () => {
  const [urlParams] = useUrlParams();
  const { lexiconId, type } = urlParams;
  return (
    <div className={styles.paper}>
      <Divider>
        <Space>
          <div>词库id：{lexiconId}</div>
          <div>模式：{type === '1' ? '英译中' : '中译英'}</div>
        </Space>
      </Divider>
    </div>
  );
};

export default Paper;
