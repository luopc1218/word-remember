import styles from './index.less';
import { Descriptions, Space, Tabs, Table, Button } from 'antd';
import type { UserModelState } from 'umi';
import { useDispatch } from 'umi';
import { useSelector } from 'umi';
import type { ModelMap } from '@/models';
import { Avatar, UploadMask } from '@/components';
import { useMemo, useCallback } from 'react';
import { usePage } from '@/hooks';

export const ProfilePage = () => {
  const userModelState = useSelector<ModelMap, UserModelState>(
    (state) => state.user,
  );

  const dispatch = useDispatch();

  const userInfo = useMemo(() => userModelState.userInfo, [userModelState]);
  usePage({ pagePath: [{ path: '/profile', title: '个人信息' }] });

  const handleChangeAvatar = useCallback<(url: string) => void>(
    (url) => {
      dispatch({
        type: 'user/changeAvatar',
        payload: url,
      });
    },
    [dispatch],
  );

  if (!userInfo) return null;

  return (
    <Space direction="vertical" className={`page ${styles.profilePage}`}>
      <div className={`module ${styles.summary}`}>
        <Space align="center">
          <Space direction="vertical" align="center">
            <UploadMask onSuccess={handleChangeAvatar}>
              <Avatar
                user={userModelState.userInfo}
                size={128}
                shape="square"
              />
            </UploadMask>
          </Space>
          <Descriptions title={userInfo.name}>
            <Descriptions.Item label="电话">{userInfo.phone}</Descriptions.Item>
            <Descriptions.Item label="电子邮箱">
              {userInfo.email}
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </div>
      <div className={`module ${styles.details}`}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="我的词库" key="lexicons">
            <Table
              bordered
              dataSource={[]}
              columns={[
                {
                  title: '姓名',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: '年龄',
                  dataIndex: 'age',
                  key: 'age',
                },
                {
                  title: '住址',
                  dataIndex: 'address',
                  key: 'address',
                },
              ]}
            />
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
              <Button>修改密码</Button>
              <Button>修改手机号</Button>
              <Button>修改电子邮箱</Button>
            </Space>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Space>
  );
};

export default ProfilePage;
