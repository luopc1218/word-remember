import apis from '@/utils/apis';
import request from '@/utils/request';
import type { Service } from './index';

export const fileService: Service = {
  async upload(file: File) {
    const url = await request(apis.uploadFile, file);
    return url;
  },
};
