import styles from './index.less';
import { Header, Footer } from '@/components';
import { Affix, Layout, ConfigProvider, Modal, Breadcrumb } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { useCallback, useEffect } from 'react';
import type { GlobalModelState, ModelMap } from 'umi';
import { useDispatch, useSelector, Link } from 'umi';

declare global {
  interface Window {
    modal: any;
  }
}

export const LayoutContainer: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const globalModelState = useSelector<ModelMap, GlobalModelState>(
    (state) => state.global,
  );
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
          <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>
              <Link to="/">主页</Link>
            </Breadcrumb.Item>
            {globalModelState.titlePath.map((path) => {
              return (
                <Breadcrumb.Item key={path.path}>
                  <Link to={path.path}>{path.title}</Link>
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
          {children}
        </Layout.Content>
        <Footer />
      </Layout>
      {contextHolder}
    </ConfigProvider>
  );
};

export default LayoutContainer;
