import { useUrlParams } from '@/hooks';
import { parseJsonToUrl } from '@/utils';
import { Space, Button, Divider, Radio } from 'antd';
import { Link } from 'umi';
import { useState } from 'react';

export const ModeSelectPage = () => {
  const [urlParams] = useUrlParams();
  const { lexiconId } = urlParams;
  const [type, setType] = useState<string>('1');
  const [shuffle, setShuffle] = useState<boolean>(false);

  return (
    <div>
      <Divider>选择练习模式</Divider>
      <Radio.Group onChange={(e) => setType(e.target.value)} value={type}>
        <Radio.Button value="1">英译汉</Radio.Button>
        <Radio.Button value="2">汉译英</Radio.Button>
      </Radio.Group>
      <Divider>是否乱序</Divider>
      <Space>
        <Radio.Group
          onChange={(e) => setShuffle(e.target.value)}
          value={shuffle}
        >
          <Radio.Button value={false}>不乱序</Radio.Button>
          <Radio.Button value={true}>乱序</Radio.Button>
        </Radio.Group>
      </Space>
      <Divider></Divider>
      <div style={{ textAlign: 'center' }}>
        <Link
          to={
            `/practice/paper?` +
            parseJsonToUrl({
              lexiconId,
              type,
              shuffle,
            })
          }
        >
          <Button type="primary" size="large" shape="round">
            开始练习
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ModeSelectPage;
