import styles from './index.less';
import { Link } from 'umi';

interface Mode {
  modeName: string;
  path: string;
}

export const IndexPage = () => {
  const modes: Mode[] = [
    {
      modeName: '词库管理',
      path: '/lexicons',
    },
    {
      modeName: '练习',
      path: '/practice',
    },
  ];

  return (
    <div className={styles.indexPage}>
      <h1>欢迎使用单词记忆器</h1>
      <div className={styles.indexPage.modeList}>
        {modes.map((item) => (
          <Link to={item.path} key={item.path}>
            <div className={styles.indexPage.modeItem}>{item.modeName}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
