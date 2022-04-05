import { Table, Tag } from 'antd';
import { useCallback } from 'react';
import styles from './index.less';
import { WordRender } from '@/components';
import type { Word } from '@/types/lexcion';

interface ReaultProps {
  isWordToMeaning: boolean;
  wordList: any[];
  answers: any[];
}

export const Reault = (props: ReaultProps) => {
  const { isWordToMeaning, wordList, answers } = props;
  const renderResult = useCallback<
    (title: string, answer: string) => JSX.Element
  >(
    (title, answer) => {
      if (!isWordToMeaning) {
        return answer === title && !!answer ? (
          <Tag color="green">正确</Tag>
        ) : (
          <Tag color="red">错误</Tag>
        );
      } else {
        return title.indexOf(answer) !== -1 && !!answer ? (
          <Tag color="green">正确</Tag>
        ) : (
          <Tag color="red">错误</Tag>
        );
      }
    },
    [isWordToMeaning],
  );

  return (
    <div className={styles.results}>
      <Table
        pagination={false}
        dataSource={wordList}
        columns={[
          {
            title: '原题',
            dataIndex: isWordToMeaning ? 'word' : 'meaning',
            render(text: string) {
              return isWordToMeaning ? (
                <WordRender word={text} />
              ) : (
                <span>{text}</span>
              );
            },
          },
          {
            title: '我的答案',
            render(row, table, index) {
              return answers[index];
            },
          },
          {
            title: '正确答案',
            dataIndex: !isWordToMeaning ? 'word' : 'meaning',
            render(text: string) {
              return !isWordToMeaning ? (
                <WordRender word={text} />
              ) : (
                <span>{text}</span>
              );
            },
          },
          {
            title: '是否正确',
            render(row: Word, table: Word, index: number) {
              return !isWordToMeaning
                ? renderResult(row.word, answers[index])
                : renderResult(row.meaning, answers[index]);
            },
          },
        ]}
      />
    </div>
  );
};

export default Reault;
