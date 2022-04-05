import { useUrlParams } from '@/hooks';
import styles from './index.less';
import { Divider, Space, Input, Button, Table } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { connect, Link } from 'umi';
import type { LexiconsModelState } from '@/models/lexicons';
import type { Lexicon, Word } from '@/types/lexcion';
import _ from 'lodash';

export const Paper = connect((state: { lexicons: LexiconsModelState }) => ({
  temporary: state.lexicons.temporary,
}))((props) => {
  const { temporary } = props;
  const [urlParams] = useUrlParams();
  const { lexiconId, type, shuffle } = urlParams;

  const currentLexicon = useMemo<Lexicon>(() => {
    if (lexiconId === '0') {
      return temporary;
    } else {
      return temporary;
    }
  }, [lexiconId, temporary]);

  const wordList = useMemo(
    () =>
      shuffle === 'true'
        ? _.shuffle(currentLexicon.wordList)
        : currentLexicon.wordList,
    [currentLexicon, shuffle],
  );

  const [answers, setAnswers] = useState<string[]>(
    new Array(wordList.length).fill(''),
  );

  const [finished, setFinished] = useState<boolean>(false);

  const refresh = useCallback(() => {
    setAnswers(new Array(wordList.length).fill(''));
    setFinished(false);
  }, [wordList]);

  return (
    <div className={styles.paper}>
      <Divider>
        <Space>
          <div>词库id：{lexiconId}</div>
          <div>模式：{type === '1' ? '英译中' : '中译英'}</div>
          <div>单词数：{wordList.length}</div>
        </Space>
      </Divider>
      {!finished ? (
        <div className={styles.wordList}>
          {wordList.map((word, index) => (
            <div key={word.phonetic} className={styles.wordItem}>
              <div className={styles.word}>
                {type === '1' ? (
                  <span>{word.word}</span>
                ) : (
                  <Input
                    value={answers[index]}
                    onChange={(e) => {
                      setAnswers((oldAnswer: string[]) => {
                        const newAnswers = [...oldAnswer];
                        newAnswers[index] = e.target.value;
                        return newAnswers;
                      });
                    }}
                  />
                )}
              </div>
              <div className={styles.meaning}>
                {type === '1' ? (
                  <Input
                    value={answers[index]}
                    onChange={(e) => {
                      setAnswers((oldAnswer: string[]) => {
                        const newAnswers = [...oldAnswer];
                        newAnswers[index] = e.target.value;
                        return newAnswers;
                      });
                    }}
                  />
                ) : (
                  <span>{word.meaning}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.results}>
          <Table
            dataSource={wordList}
            columns={[
              { title: '原题', dataIndex: type === '1' ? 'word' : 'meaning' },
              {
                title: '我的答案',
                render(row, table, index) {
                  return answers[index];
                },
              },
              {
                title: '正确答案',
                dataIndex: type === '1' ? 'meaning' : 'word',
              },
              ...(type === '1'
                ? []
                : [
                    {
                      title: '是否正确',
                      render(row: Word, table: Word, index: number) {
                        return <div>
                          {answers[index] === row.word?'正确':'错误'}
                        </div>;
                      },
                    },
                  ]),
            ]}
          />
        </div>
      )}
      <Space>
        {finished ? (
          <Button
            size="large"
            shape="round"
            type="primary"
            onClick={() => refresh()}
          >
            重新开始
          </Button>
        ) : (
          <Button
            size="large"
            shape="round"
            type="primary"
            onClick={() => setFinished(true)}
          >
            提交
          </Button>
        )}
      </Space>
    </div>
  );
});

export default Paper;
