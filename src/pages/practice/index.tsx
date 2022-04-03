import { connect, Link } from 'umi';
import { Divider, Card, Space } from 'antd';
import type { LexiconsModelState } from '@/models/lexicons';
import { PlusOutlined } from '@ant-design/icons';

interface PracticePageProps {
  lexicons: LexiconsModelState;
}

export const PracticePage = connect((state) => state)(
  (props: PracticePageProps) => {
    const { lexiconList, temporary } = props.lexicons;
    console.log(lexiconList);

    return (
      <div className="practicePage">
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
  },
);

export default PracticePage;
