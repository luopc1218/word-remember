import type { Api } from './apis';
import { request as baseRequest } from 'umi';
import type { RequestOptionsInit } from 'umi-request';
import { message } from 'antd';

/**
 * 请求拦截器
 * @param url 请求地址
 * @param requestOptions 请求设置
 * @returns Promise
 */
const requestInterceptors = (
  url: string,
  requestOptions: RequestOptionsInit,
): Promise<void> => {
  console.log(url, requestOptions);
  return Promise.resolve();
};

/**
 * 错误处理程序
 * @param error Error对象
 * @returns Promise
 */
const errorHandler = (error: Error): Promise<void> => {
  message.error(error.message);
  return Promise.resolve();
};

/**
 * 返回拦截器
 * @param res 返回对象
 * @returns Promise
 */
const responseInterceptors = (res: any): Promise<any> => {
  if (!res.success) {
    return Promise.reject(res);
  } else {
    const resData = res.data;
    return Promise.resolve(resData);
  }
};

/**
 * 封装请求
 * @param api Api对象
 * @param params 请求参数
 * @returns Promise
 */
export const request = (
  api: Api,
  params?: Record<string, any> | FormData,
): Promise<any> => {
  return new Promise((reslove, reject) => {
    const requestOptions: RequestOptionsInit = {
      method: api.method,
      skipErrorHandler: true,
    };
    if (api.method === 'GET') {
      requestOptions.params = params;
    } else {
      requestOptions.data = params;
    }
    requestInterceptors(api.url, requestOptions).then(() => {
      baseRequest(api.url, requestOptions)
        .then((res) => {
          responseInterceptors(res)
            .then((resData) => {
              reslove(resData);
            })
            .catch((error) => {
              errorHandler(error).then(() => {
                reject(error);
              });
            });
        })
        .catch((error) => {
          message.error(error.message);
          reject(error);
        });
    });
  });
};

export default request;
