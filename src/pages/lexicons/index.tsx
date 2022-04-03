import { Tabs, Button } from 'antd'
import { useCallback, useState } from 'react'
import { connect } from 'umi'
import type { LexiconsModelState } from '@/models/lexicons'
import type { Lexicon } from '@/types/lexcion'

interface LexiconsPageProps {
    lexicons: LexiconsModelState
}

export const LexiconsPage = connect(state => state)((props: LexiconsPageProps) => {

    const { lexiconList } = props.lexicons


    const handleChangeLexicons = useCallback((e, t) => {
        switch (t) {
            case 'add':

                break
            case 'remove':

                break
        }

    }, [])



    return <div>
        <div>
            <h1>词库管理</h1>
        </div>
        <Tabs type="editable-card" onEdit={handleChangeLexicons}>
            {lexiconList.map(() => <Tabs.TabPane tab="Tab 1">
                Content of Tab Pane 1
            </Tabs.TabPane>)}
        </Tabs>
    </div>

})

export default LexiconsPage