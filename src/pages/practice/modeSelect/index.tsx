import { useUrlParams } from '@/hooks';
import { parseJsonToUrl } from '@/tools';
import { Space, Button, Divider } from 'antd';
import { Link } from 'umi';

export const ModeSelectPage = () => {
  const [urlParams] = useUrlParams();
  const { lexiconId } = urlParams;
  return (
    <div>
      <Divider>选择练习模式</Divider>
      <Space>
        <Link
          to={
            `/practice/paper?` +
            parseJsonToUrl({
              lexiconId,
              type: 1,
            })
          }
        >
          <Button type="primary">英译中</Button>
        </Link>
        <Link
          to={
            `/practice/paper?` +
            parseJsonToUrl({
              lexiconId,
              type: 2,
            })
          }
        >
          <Button type="primary">中译英</Button>
        </Link>
      </Space>
    </div>
  );
};

export default ModeSelectPage;
