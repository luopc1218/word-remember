import { usePage } from '@/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'umi';
import styles from './index.less';

export const LexiconsPage: React.FC = () => {
  usePage({ pagePath: [{ path: '/lexicons', title: '词库管理' }] });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'lexicons/getLexiconList',
    });
  }, [dispatch]);

  return <div className={`page module ${styles.lexiconsPage}`}></div>;
};

export default LexiconsPage;
