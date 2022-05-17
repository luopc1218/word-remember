import { useState } from 'react';
import styles from './index.less';
import { LoadingOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Upload } from '@/components';

interface UploadMaskProps {
  mask: boolean;
  title: string;
}

export const UploadMask: React.FC<UploadMaskProps> = ({
  mask = true,
  title = '点击上传',
  children,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={`${styles.uploadMask}`}>
      <Upload disabled={loading} showUploadList={false}>
        {loading && (
          <div className={styles.loading}>
            <Space align="center">
              <LoadingOutlined />
              请稍后
            </Space>
          </div>
        )}
        {!loading && mask && (
          <div className={styles.mask}>
            <div className={styles.title}>{title}</div>
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </Upload>
    </div>
  );
};

export default UploadMask;
