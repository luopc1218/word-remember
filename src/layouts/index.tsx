import styles from './index.less';
import { Header, Footer } from '@/components';
import { Affix, Breadcrumb, Layout } from 'antd';

export const LayoutContainer: React.FC = (props) => {
  const { children } = props;
  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout.Content className={styles.content}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">主页</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        {children}
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default LayoutContainer;
