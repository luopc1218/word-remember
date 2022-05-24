import { RemoteTable } from '@/components';
import apis from '@/utils/apis';
import { Button, Space } from 'antd';
import styles from './index.less';

export const Lexicons: React.FC = () => {
  return (
    <Space direction="vertical" className={styles.lexicons}>
      <Space>
        <Button>添加词库</Button>
      </Space>
      <RemoteTable
        api={apis.getUserLexicons}
        columns={[
          { title: '词库名', dataIndex: 'name' },
          {
            title: '操作',
            render() {
              return <Button type="link">查看</Button>;
            },
          },
        ]}
      />
    </Space>
  );
};

export default Lexicons;
