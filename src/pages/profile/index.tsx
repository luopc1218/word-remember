import styles from './index.less';
import {
  Descriptions,
  Space,
  Tabs,
  Table,
  Button,
  Spin,
  Modal,
  message,
} from 'antd';
import type { UserModelState } from 'umi';
import { useDispatch } from 'umi';
import { useSelector } from 'umi';
import type { ModelMap } from '@/models';
import { Avatar, FormModal, UploadMask } from '@/components';
import { useMemo, useCallback } from 'react';
import { usePage } from '@/hooks';
import type { ChangePasswordFormData } from '@/components/FormModal';
import { ChangePasswordForm } from '@/components/FormModal';
import { LexiconsTable } from './components';

export const ProfilePage = () => {
  const userModelState = useSelector<ModelMap, UserModelState>(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const userInfo = useMemo(() => userModelState.userInfo, [userModelState]);
  const loading = useMemo<boolean>(
    () =>
      userModelState.checkSignInLoading || userModelState.getUserInfoLoading,
    [userModelState.checkSignInLoading, userModelState.getUserInfoLoading],
  );
  usePage({ pagePath: [{ path: '/profile', title: '个人信息' }] });

  // 监听修改头像
  const handleChangeAvatar = useCallback<(url: string) => void>(
    (url) => {
      dispatch({
        type: 'user/changeAvatar',
        payload: url,
      });
    },
    [dispatch],
  );

  // 监听修改密码
  const handleChangePassword = useCallback(() => {
    FormModal.open<ChangePasswordFormData>(
      ChangePasswordForm,
      (changePasswordFormData, reslove, reject) => {
        Modal.confirm({
          title: '确定修改密码?',
          content: '修改后需要重新登陆',
          type: 'warning',
          onOk() {
            dispatch({
              type: 'user/changePassword',
              payload: {
                changePasswordFormData,
                reslove,
                reject,
              },
            });
          },
          onCancel() {
            reject();
          },
        });
      },
    );
  }, [dispatch]);

  const handleChangePhone = useCallback(() => {
    message.error('暂不支持');
  }, []);

  const handleChangeEmail = useCallback(() => {
    message.error('暂不支持');
  }, []);

  if (!userInfo) return null;

  return (
    <Spin spinning={loading}>
      <Space direction="vertical" className={`page ${styles.profilePage}`}>
        <div className={`module ${styles.summary}`}>
          <Space align="center">
            <Space direction="vertical" align="center">
              <UploadMask
                onSuccess={handleChangeAvatar}
                uploadOptions={{
                  accept: 'image/*,.gif',
                }}
              >
                <Avatar
                  user={userModelState.userInfo}
                  size={128}
                  shape="square"
                />
              </UploadMask>
            </Space>
            <Descriptions title={userInfo.name} className={styles.summary}>
              <Descriptions.Item label="电话">
                {userInfo.phone}
              </Descriptions.Item>
              <Descriptions.Item label="电子邮箱">
                {userInfo.email}
              </Descriptions.Item>
            </Descriptions>
          </Space>
        </div>
        <div className={`module ${styles.details}`}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="我的词库" key="lexicons">
              <LexiconsTable />
            </Tabs.TabPane>
            <Tabs.TabPane tab="我的练习" key="practice">
              <Table
                bordered
                dataSource={[]}
                columns={[
                  {
                    title: '题库',
                    dataIndex: 'name',
                    key: 'name',
                  },
                  {
                    title: '练习时间',
                    dataIndex: 'age',
                    key: 'age',
                  },
                  {
                    title: '分数',
                    dataIndex: 'address',
                    key: 'address',
                  },
                ]}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="偏好设置" key="setting">
              <Space>
                <Button onClick={handleChangePassword}>修改密码</Button>
                <Button onClick={handleChangePhone}>修改手机号</Button>
                <Button onClick={handleChangeEmail}>修改电子邮箱</Button>
              </Space>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Space>
    </Spin>
  );
};

export default ProfilePage;
