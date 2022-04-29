import { Layout, Button, Spin } from 'antd';
import styles from './index.less';
import type { UserModelState } from 'umi';
import { useDispatch, connect } from 'umi';
import { Link } from 'umi';
import type { SignInFormData } from '../FormModal';
import { FormModal, SignInForm } from '../FormModal';
import type { ModelMap } from '@/models';



export interface MapStateToHeaderProps {
  user: UserModelState
}

export type HeaderProps = MapStateToHeaderProps

export const Header = connect<MapStateToHeaderProps, {}, {}, ModelMap>((state) => ({
  user: state.user
}))((props: MapStateToHeaderProps) => {
  const { user } = props;
  const dispatch = useDispatch();


  const openSignInForm = () => {
    FormModal.open<SignInFormData>(
      SignInForm,
      (signInFormData, reslove, reject) => {
        dispatch({
          type: 'user/signIn',
          payload: {
            signInFormData, reslove, reject
          }
        })
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
        {user.getUserInfoLoading ? <Spin /> : user.userInfo ? <div>hi {user.userInfo.name}</div> : <Button type="link" onClick={openSignInForm}>
          请登录
        </Button>}
      </div>
    </Layout.Header>
  );
})

export default Header;
