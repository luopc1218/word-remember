import styles from './index.less';
import { Header, Footer } from '@/components';
import { Affix, Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

export const LayoutContainer: React.FC = (props) => {
  const { children } = props;
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className={styles.layout}>
        <Affix offsetTop={0}>
          <Header />
        </Affix>
        <Layout.Content className={styles.content}>
          {/* <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>
              <a href="/">主页</a>
            </Breadcrumb.Item>
          </Breadcrumb> */}
          <div className={styles.page}>{children}</div>
        </Layout.Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutContainer;
