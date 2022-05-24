import { useFetch, usePage } from '@/hooks';
import styles from './index.less';
import { Card, Divider, Space } from 'antd';
import apis from '@/utils/apis';
import type { Lexicon, ResponseList } from '@/types';

export const LexiconsPage: React.FC = () => {
  usePage({ pagePath: [{ path: '/lexicons', title: '词库管理' }] });
  const [userLexicons, userLexiconsLoading] = useFetch<ResponseList<Lexicon>>(
    apis.getUserLexicons,
  );

  return (
    <div className={`page module ${styles.lexiconsPage}`}>
      <Divider>内置词库</Divider>
      <Divider>个人词库</Divider>
      <Space>
        {userLexicons?.list.map((lexicon) => {
          return (
            <Card
              key={lexicon.id}
              hoverable
              style={{ width: 240 }}
              cover={
                lexicon.cover ? (
                  <img alt={lexicon.name} src={lexicon.cover} />
                ) : (
                  false
                )
              }
            >
              <Card.Meta
                title={lexicon.name}
                description={lexicon.description}
              />
            </Card>
          );
        })}
      </Space>
      <Divider>临时词库</Divider>
    </div>
  );
};

export default LexiconsPage;
