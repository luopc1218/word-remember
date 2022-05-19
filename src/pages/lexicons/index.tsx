import { Tabs } from 'antd';
import { useCallback } from 'react';
import type { LexiconsModelState, ModelMap } from 'umi';
import { useSelector } from 'umi';
import { usePage } from '@/hooks';
import styles from './index.less';

export const LexiconsPage: React.FC = () => {
  const lexiconsModelState = useSelector<ModelMap, LexiconsModelState>(
    (state) => state.lexicons,
  );
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
    <div className={`page module ${styles.lexiconsPage}`}>
      <Tabs type="editable-card" onEdit={handleChangeLexicons}>
        {lexiconsModelState.lexiconList.map(() => (
          <Tabs.TabPane tab="Tab 1">Content of Tab Pane 1</Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default LexiconsPage;
