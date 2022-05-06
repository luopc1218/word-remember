import { Layout, Button, Spin, Space } from 'antd';
import styles from './index.less';
import type { UserModelState } from 'umi';
import { useDispatch, connect } from 'umi';
import { Link } from 'umi';
import type { SignInFormData } from '../FormModal';
import { FormModal, SignInForm } from '../FormModal';
import type { ModelMap } from '@/models';
import { MoreOutlined } from '@ant-design/icons';
import React from 'react';
import type { User } from '@/types/user';

export interface MapStateToHeaderProps {
  user: UserModelState;
}

export type HeaderProps = MapStateToHeaderProps;

interface HeaderUserProps {
  userInfo: User | undefined;
  onSignIn: () => void;
}

const HeaderUser: React.FC<HeaderUserProps> = ({ userInfo, onSignIn }) => {
  if (!userInfo) {
    return (
      <Button type="link" onClick={onSignIn}>
        请登录
      </Button>
    );
  }
  return (
    <Space align="center" className={styles.user}>
      <div>hi {userInfo.name}</div>
      <MoreOutlined className={styles.userInfoBtn} />
    </Space>
  );
};

export const Header = connect<MapStateToHeaderProps, {}, {}, ModelMap>(
  (state) => ({
    user: state.user,
  }),
)((props: MapStateToHeaderProps) => {
  const { user } = props;
  const dispatch = useDispatch();

  const openSignInForm = () => {
    FormModal.open<SignInFormData>(
      SignInForm,
      (signInFormData, reslove, reject) => {
        dispatch({
          type: 'user/signIn',
          payload: {
            signInFormData,
            reslove,
            reject,
          },
        });
      },
      {
        title: null,
        icon: null,
        okText: '立即登录',
        closable: true,
      },
      'signInForm',
    );
  };

  return (
    <Layout.Header className={styles.header}>
      <Link to="/" className={styles.logo}>
        单词记忆器
      </Link>
      <div className={styles.navigator} />
      <div className={styles.user}>
        {user.checkSignInLoading ? (
          <Spin />
        ) : (
          <HeaderUser onSignIn={openSignInForm} userInfo={user.userInfo} />
        )}
      </div>
    </Layout.Header>
  );
});

export default Header;
