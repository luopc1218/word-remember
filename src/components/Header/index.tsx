import { Layout, Button, Spin, Space, Menu, Dropdown, Modal } from 'antd';
import styles from './index.less';
import type { UserModelState } from 'umi';
import { useDispatch, useSelector } from 'umi';
import { Link } from 'umi';
import type { SignInFormData } from '../FormModal';
import { FormModal, SignInForm } from '../FormModal';
import type { ModelMap } from '@/models';
import { MoreOutlined } from '@ant-design/icons';
import type { User } from '@/types/user';
import { Avatar } from '@/components';
import { useMemo } from 'react';

interface HeaderUserProps {
  userModelState: UserModelState;
  onSignIn: () => void;
}

const HeaderUser: React.FC<HeaderUserProps> = ({
  userModelState,
  onSignIn,
}) => {
  const loading = useMemo<boolean>(
    () =>
      userModelState.checkSignInLoading || userModelState.getUserInfoLoading,
    [userModelState.checkSignInLoading, userModelState.getUserInfoLoading],
  );
  const userInfo = useMemo<User | undefined>(
    () => userModelState.userInfo,
    [userModelState.userInfo],
  );
  const dispatch = useDispatch();

  if (loading) {
    return <Spin />;
  }
  if (!userInfo) {
    return (
      <Button type="link" onClick={onSignIn}>
        请登录
      </Button>
    );
  }

  const handleSignOut = (): void => {
    Modal.confirm({
      type: 'warning',
      content: '确定要注销当前用户吗?',
      onOk() {
        dispatch({
          type: 'user/signOut',
        });
      },
      okButtonProps: {
        danger: true,
      },
    });
  };

  const handleClickUserDropdown = ({ key }: { key: string }): void => {
    switch (key) {
      case 'signOut': {
        handleSignOut();
        break;
      }
    }
  };

  return (
    <div className={styles.user}>
      <Space align="center">
        <Avatar user={userInfo} />
        <span>hi {userInfo.name}</span>

        <Dropdown
          trigger={['click']}
          overlay={
            <Menu
              onClick={handleClickUserDropdown}
              items={[
                { label: <Link to="/profile">个人信息</Link>, key: 'profile' },
                {
                  label: '注销',
                  key: 'signOut',
                  danger: true,
                },
              ]}
            />
          }
        >
          <MoreOutlined className={styles.userInfoBtn} />
        </Dropdown>
      </Space>
    </div>
  );
};

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const userModelState = useSelector<ModelMap, UserModelState>((state) => {
    return state.user;
  });
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
      <HeaderUser userModelState={userModelState} onSignIn={openSignInForm} />
    </Layout.Header>
  );
};

export default Header;
