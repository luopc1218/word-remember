import { connect, Link } from 'umi';
import type { Lexicon } from '@/types/lexcion';
import type { TableProps } from 'antd';
import { Table, Input, Button, Popconfirm, Space, Alert, Divider } from 'antd';
import type { Word } from '@/types/lexcion';
import { useCallback, useMemo, useState } from 'react';
import type { LexiconsModelState } from '@/models/lexicons';
import { Dictvoice, WordImporter } from '@/components';

interface TemporaryPageProps {
  temporary: Lexicon;
  addNewWord: (newWord: NewWord) => void;
  deleteWord: (wordIndex: number) => void;
  clearWords: () => void;
}

interface NewWord extends Word {
  newItem?: boolean;
  index?: number;
}

export const TemporaryPage = connect(
  (state: { lexicons: LexiconsModelState }) => {
    return {
      temporary: state.lexicons.temporary,
    };
  },
  (dispatch) => {
    return {
      addNewWord: (newWord: NewWord) =>
        dispatch({
          type: 'lexicons/addNewWordToTemporary',
          payload: newWord,
        }),
      deleteWord(wordIndex: number) {
        dispatch({
          type: 'lexicons/deleteWordFromTemporary',
          payload: wordIndex,
        });
      },
      clearWords() {
        dispatch({
          type: 'lexicons/cleanTemporary',
        });
      },
    };
  },
)(({ temporary, addNewWord, deleteWord, clearWords }: TemporaryPageProps) => {
  const [newWord, setNewWord] = useState<NewWord>({
    word: '',
    phonetic: '',
    meaning: '',
    newItem: true,
  });

  const handleConfirmNewWord = useCallback<() => void>(() => {
    const tempNewWord = { ...newWord };
    delete tempNewWord.newItem;
    addNewWord(tempNewWord);
    setNewWord({ word: '', phonetic: '', meaning: '', newItem: true });
  }, [addNewWord, newWord]);

  const handleDeleteWord = useCallback(
    (wordIndex: number): void => {
      deleteWord(wordIndex);
    },
    [deleteWord],
  );

  const handleClearTemporary = useCallback(() => {
    clearWords();
  }, [clearWords]);

  const tableProps = useMemo<TableProps<NewWord>>(
    () => ({
      title: () => (
        <Space>
          <div>{temporary.title}</div>
          <Popconfirm
            title="确定清空这个词库吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => {
              handleClearTemporary();
            }}
          >
            <Button danger>清空词库</Button>
          </Popconfirm>
        </Space>
      ),
      dataSource: [...temporary.wordList, newWord].map((item, index) => ({
        ...item,
        index,
      })),
      pagination: {
        pageSize: 20,
      },
      footer() {
        return (
          <WordImporter>
            <div style={{ textAlign: 'right' }}>
              <Button>导入单词</Button>
            </div>
          </WordImporter>
        );
      },
      rowKey: 'index',
      columns: [
        {
          title: '单词',
          dataIndex: 'word',
          key: 'word',
          render(text: string, row: NewWord) {
            if (row.newItem) {
              return (
                <Input
                  value={newWord.word}
                  onChange={(e) => {
                    setNewWord({ ...newWord, word: e.target.value });
                  }}
                />
              );
            } else {
              return (
                <Space>
                  <span>{text}</span>
                  <Dictvoice word={text} />
                </Space>
              );
            }
          },
        },
        {
          title: '音标',
          dataIndex: 'phonetic',
          key: 'phonetic',
          render(text: string, row: NewWord) {
            if (row.newItem) {
              return (
                <Input
                  value={newWord.phonetic}
                  onChange={(e) => {
                    setNewWord({ ...newWord, phonetic: e.target.value });
                  }}
                />
              );
            } else {
              return text;
            }
          },
        },
        {
          title: '翻译',
          dataIndex: 'meaning',
          key: 'meaning',
          render(text: string, row: NewWord) {
            if (row.newItem) {
              return (
                <Input
                  value={newWord.meaning}
                  onChange={(e) => {
                    setNewWord({ ...newWord, meaning: e.target.value });
                  }}
                />
              );
            } else {
              return text;
            }
          },
        },
        {
          title: '操作',
          render(row: NewWord, record, index: number) {
            if (row.newItem)
              return (
                <Button type="primary" onClick={handleConfirmNewWord}>
                  添加
                </Button>
              );
            else
              return (
                <Popconfirm
                  title="确定从词库删除这个单词吗？"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => {
                    handleDeleteWord(index);
                  }}
                >
                  <Button danger>删除</Button>
                </Popconfirm>
              );
          },
        },
      ],
    }),
    [
      handleClearTemporary,
      handleConfirmNewWord,
      handleDeleteWord,
      newWord,
      temporary.title,
      temporary.wordList,
    ],
  );

  return (
    <div className="page module">
      <Alert message="警告！清空浏览器缓存会导致临时词库丢失！" type="error" />
      <Table {...tableProps} />
      <Divider></Divider>
      <div style={{ textAlign: 'center', margin: 50 }}>
        <Link to={'/practice/modeSelect?lexiconId=0'}>
          <Button size="large" shape="round" type="primary">
            开始练习
          </Button>
        </Link>
      </div>
    </div>
  );
});

export default TemporaryPage;
