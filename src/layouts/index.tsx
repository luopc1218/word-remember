import styles from './index.less';
import { Header, Footer } from '@/components';
import { Affix, Layout, ConfigProvider, Modal } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'umi';

declare global {
  interface Window {
    modal: any;
  }
}

export const LayoutContainer: React.FC = (props) => {
  const { children } = props;

  const dispatch = useDispatch();

  const [modal, contextHolder] = Modal.useModal();

  const initApp = useCallback(() => {
    window.modal = modal;
    dispatch({
      type: 'user/checkSignIn',
    });
    dispatch({
      type: 'global/getSysConfig',
    });
  }, [dispatch, modal]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className={styles.layout} id="root-layout">
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
      {contextHolder}
    </ConfigProvider>
  );
};

export default LayoutContainer;
