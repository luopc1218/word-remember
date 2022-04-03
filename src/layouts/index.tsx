import styles from './index.less'
import { useHistory, Link } from 'umi'
import { Button, Affix } from 'antd'

export const LayoutContainer = ({ children }) => {
    return <div className={styles.layoutContainer}>
        {children}
    </div>
}

export default LayoutContainer