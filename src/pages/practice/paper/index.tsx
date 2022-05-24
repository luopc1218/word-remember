import { useUrlParams } from '@/hooks';
import styles from './index.less';
import { Divider, Space, Input, Button } from 'antd';
import { useMemo, useState } from 'react';
import { Link } from 'umi';
import _ from 'lodash';
import { Result } from './components';

export const Paper = () => {
  const [urlParams] = useUrlParams();
  const { lexiconId, type, shuffle } = urlParams;

  const isWordToMeaning = useMemo<boolean>(() => type === '1', [type]);

  const currentLexicon = {
    wordList: [],
  };

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

  return (
    <div className={`page module ${styles.paper}`}>
      <Divider>
        <Space>
          <div>词库id：{lexiconId}</div>
          <div>模式：{isWordToMeaning ? '英译中' : '中译英'}</div>
          <div>单词数：{wordList.length}</div>
        </Space>
      </Divider>
      {!finished ? (
        <div className={styles.wordList}>
          {wordList.map((word, index) => (
            <div key={word.phonetic} className={styles.wordItem}>
              <div className={styles.word}>
                {isWordToMeaning ? (
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
                {isWordToMeaning ? (
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
        <Result
          isWordToMeaning={isWordToMeaning}
          wordList={wordList}
          answers={answers}
        />
      )}
      <Space style={{ margin: 50 }}>
        {finished ? (
          <Link to={`/practice/modeSelect?lexiconId=${lexiconId}`}>
            <Button size="large" shape="round" type="primary">
              重新开始
            </Button>
          </Link>
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
};

export default Paper;
