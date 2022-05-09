import styles from './index.less';
import { Descriptions, Space, Tabs, Table } from 'antd';
import type { UserModelState } from 'umi';
import { useSelector } from 'umi';
import type { ModelMap } from '@/models';
import { Avatar } from '@/components';
import { useMemo } from 'react';
import { usePage } from '@/hooks';

export const ProfilePage = () => {
  const userModelState = useSelector<ModelMap, UserModelState>(
    (state) => state.user,
  );

  const userInfo = useMemo(() => userModelState.userInfo, [userModelState]);
  usePage({ pagePath: [{ path: '/profile', title: '个人信息' }] });

  if (!userInfo) return null;
  return (
    <div className={styles.profilePage}>
      <div className="page">
        <Space align="center">
          <Space direction="vertical" align="center">
            <Avatar user={userModelState.userInfo} size={128} shape="square" />
          </Space>
          <Descriptions title={userInfo.name}>
            <Descriptions.Item label="电话">{userInfo.phone}</Descriptions.Item>
            <Descriptions.Item label="电子邮箱">
              {userInfo.email}
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </div>
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
          <div className="module">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
            recusandae.
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
