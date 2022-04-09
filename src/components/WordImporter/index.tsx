import { useState, useCallback } from 'react';
import { Modal, Input } from 'antd';
import type { Word } from '@/types/lexcion';
import { connect } from 'umi';

export const WordImporter = connect(null, (dispatch) => {
  return {
    importNewWords(wordList: Word[]) {
      dispatch({
        type: 'lexicons/importWordsToTemporary',
        payload: wordList,
      });
    },
  };
})(({ children, importNewWords }) => {
  const [importing, setImporting] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [importingContent, setImportingContent] = useState<string>('');

  const handleImport = () => {
    setImporting(true);
  };

  const importFinished = useCallback(() => {
    setImporting(false);
    setImportingContent('');
  }, []);

  const handleConfirm = useCallback(() => {
    setLoading(true);
    const wordList: Word[] = importingContent.split('\n').map((word) => {
      const wordArray = word.split(/ \/(.*)\/ /);
      return {
        word: wordArray[0],
        phonetic: wordArray[1],
        meaning: wordArray[2],
      };
    });
    importNewWords(wordList.filter((item) => !!item.word && !!item.meaning));
    setLoading(false);
    importFinished();
  }, [importFinished, importNewWords, importingContent]);

  return (
    <div>
      <Modal
        title="单词导入"
        visible={importing}
        onCancel={() => setImporting(false)}
        onOk={handleConfirm}
        okButtonProps={{
          loading: loading,
          danger: true,
        }}
      >
        <div>
          输入格式参考：
          <div>
            {`
             attractive /ə'træktɪv/ adj. 吸引人的；有魅力的
             audience /ɔːdiəns/ n. 听众，观众
             Australia /ɔː'streɪliə/ n. 澳大利亚，澳洲
             authority /ə'θɔːrəti/ n. 官方机构；当局
             autobiography /ˌɔːtəbaɪ'ɑːɡrəfi] / n. 自传；自传文学
             `}
          </div>
          <Input.TextArea
            autoSize
            value={importingContent}
            onChange={(e) => setImportingContent(e.target.value)}
            placeholder="输入要导入的单词表"
          />
        </div>
      </Modal>
      <div onClick={handleImport}>{children}</div>
    </div>
  );
});

export default WordImporter;
