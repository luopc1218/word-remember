import type { Api } from '@/utils/apis';
import request from '@/utils/request';
import { useState, useEffect, useCallback } from 'react';

export const useFetch = <T = any,>(
  api: Api,
  params?: any,
): [T | undefined, boolean] => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const handleRequest = useCallback(async () => {
    setLoading(true);
    try {
      const resData = await request(api, params);
      setData(resData);
      setLoading(false);
    } catch (error) {
      setData(undefined);
      setLoading(false);
    }
  }, [api, params]);

  useEffect(() => {
    handleRequest();
  }, [api, handleRequest, params]);

  return [data, loading];
};

export default useFetch;
