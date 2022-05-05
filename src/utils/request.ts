import type { Api } from './apis';
import { request as baseRequest } from 'umi';
import type { RequestOptionsInit } from 'umi-request';
import { message, notification } from 'antd';

interface ResponseBody {
  code: number;
  data?: any;
  message?: string;
  success: boolean;
}

enum ShowType {
  byMessage = 1,
  byNotification = 2,
}
interface ResponseOptions {
  showSuccessMessage?: boolean;
  showErrorMessage?: boolean;
  showType?: ShowType;
}

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
const errorHandler = (res: ResponseBody): void => {
  const { code } = res;
  switch (code) {
    case 401: {
      // 登陆失效
      // console.log('登陆失效');
    }
  }
};

/**
 * 返回拦截器
 * @param res 返回对象
 * @returns Promise
 */
const responseInterceptors = (res: ResponseBody): Promise<any> => {
  if (!res.success) {
    errorHandler(res);
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
export const request = async (
  api: Api,
  params?: Record<string, any> | FormData,
  responseOptions?: ResponseOptions,
) => {
  const {
    showErrorMessage = true,
    showSuccessMessage = false,
    showType = ShowType.byMessage,
  } = responseOptions || {};
  const accessToken: string = localStorage.getItem('accessToken') || '';
  const requestOptions: RequestOptionsInit = {
    method: api.method,
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    skipErrorHandler: true,
  };
  if (api.method === 'GET') {
    requestOptions.params = params;
  } else {
    requestOptions.data = params;
  }
  try {
    await requestInterceptors(api.url, requestOptions);
    const response = await baseRequest(api.url, requestOptions);
    if (showSuccessMessage) {
      switch (showType) {
        case ShowType.byMessage: {
          message.success(response.message);
          break;
        }
        case ShowType.byNotification: {
          notification.open({
            type: 'success',
            message: response.message,
          });
          break;
        }
      }
    }
    const responseData = await responseInterceptors(response);
    return Promise.resolve(responseData);
  } catch (error: any) {
    if (showErrorMessage) {
      console.log(showType, ShowType.byNotification);

      switch (showType) {
        case ShowType.byMessage: {
          message.error(error.message);
          break;
        }
        case ShowType.byNotification: {
          notification.open({
            type: 'error',
            message: error.message,
          });
          break;
        }
      }
    }
    return Promise.reject(error.message);
  }
};

export default request;