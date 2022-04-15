import { Space, Button, Tooltip } from 'antd';
import { Link } from 'umi';
import styles from './index.less';
import { Iconfont } from '@/components';

interface FixedMenuItem {
  title: string;
  path: string;
  icon: string;
}

export const FixedMenu = () => {
  const fixedMenuList: FixedMenuItem[] = [
    {
      title: '主页',
      icon: 'icon-home',
      path: '/',
    },
    {
      title: '词库管理',
      icon: 'icon-home',
      path: '/lexicons',
    },
    {
      title: '联系',
      icon: 'icon-home',
      path: '/practice',
    },
  ];

  return (
    <Space direction="vertical" className={styles.fixedMenu}>
      {fixedMenuList.map((item) => (
        <Link to="/practice" key={item.path}>
          <Tooltip placement="left" title={item.title}>
            <Button shape="circle">
              <Iconfont type={item.icon} />
            </Button>
          </Tooltip>
        </Link>
      ))}
    </Space>
  );
};

export default FixedMenu;
