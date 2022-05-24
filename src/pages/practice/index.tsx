import { Link } from 'umi';
import { Divider, Card, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { usePage } from '@/hooks';

export const PracticePage = () => {
  usePage({
    pagePath: [{ path: '/practice', title: '练习' }],
  });
  return (
    <div className="practicePage page module">
      <Divider>内置词库</Divider>
      <Space>
        <Card>
          <PlusOutlined />
        </Card>
      </Space>
      <Divider>自定义词库</Divider>
      <Space>
        <Card>
          <PlusOutlined />
        </Card>
      </Space>
      <Divider>临时词库</Divider>
      <Space>
        <Link to="/practice/temporary">
          <Card>
            <div></div>
          </Card>
        </Link>
      </Space>
    </div>
  );
};

export default PracticePage;
