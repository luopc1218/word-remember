import { Tabs } from 'antd';
import { useCallback } from 'react';
import { connect } from 'umi';
import type { LexiconsModelState } from '@/models/lexicons';
import type { ModelMap } from '@/models';
import { usePage } from '@/hooks';

interface MapStateToHeaderProps {
  lexicons: LexiconsModelState;
}

interface LexiconsPageProps extends MapStateToHeaderProps {}

export const LexiconsPage: React.FC<LexiconsPageProps> = ({ lexicons }) => {
  usePage({ pagePath: [{ path: '/lexicons', title: '词库管理' }] });
  const handleChangeLexicons = useCallback((e, t) => {
    switch (t) {
      case 'add':
        break;
      case 'remove':
        break;
    }
  }, []);

  return (
    <div>
      <div>
        <h1>词库管理</h1>
      </div>
      <Tabs type="editable-card" onEdit={handleChangeLexicons}>
        {lexicons.lexiconList.map(() => (
          <Tabs.TabPane tab="Tab 1">Content of Tab Pane 1</Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export const LexiconsPageWithConnect = connect<
  MapStateToHeaderProps,
  {},
  {},
  ModelMap
>((state) => ({
  lexicons: state.lexicons,
}))(LexiconsPage);

export default LexiconsPageWithConnect;
