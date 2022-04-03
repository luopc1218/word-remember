import { parseUrlToJson } from '@/tools';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'umi';

type UrlParams = Record<string, string>;

export const useUrlParams = (): [UrlParams, any, string] => {
  const history = useHistory();
  const { search, pathname } = history.location;
  const urlParams: UrlParams = useMemo(() => parseUrlToJson(search), [search]);
  const setUrlParams = useCallback(() => {}, []);
  return [urlParams, setUrlParams, pathname];
};
export default useUrlParams;
