import { useFetch } from '@/hooks';
import type { Api } from '@/utils/apis';
import type { TableProps } from 'antd';
import { Table } from 'antd';

interface RemoteTableProps extends TableProps<any> {
  api: Api;
  params?: Record<string, any>;
}

interface TableData {
  list: any[];
  totalcount: number;
}

export const RemoteTable: React.FC<RemoteTableProps> = ({
  api,
  params,
  ...rest
}) => {
  const [data = { list: [], totalcount: 0 }, getFetchLoading] =
    useFetch<TableData>(api, params);
  const { list } = data;
  return (
    <Table
      loading={getFetchLoading}
      dataSource={list}
      pagination={false}
      {...rest}
    />
  );
};

export default RemoteTable;
