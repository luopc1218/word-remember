import { connect, Link } from 'umi';
import { Divider, Card, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ModelMap } from '@/models';
import type { LexiconsModelState } from '@/models/lexicons';
import { usePage } from '@/hooks';

export type PracticePageProps = LexiconsModelState;

export const PracticePage = connect<LexiconsModelState, {}, {}, ModelMap>(
  (state) => {
    return state.lexicons;
  },
)(({ lexiconList, temporary }: PracticePageProps) => {
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
            <div>
              <div>{temporary.title}</div>
              <div>单词数：{temporary.wordList.length}</div>
            </div>
          </Card>
        </Link>
      </Space>
    </div>
  );
});

export default PracticePage;
