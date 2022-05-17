import { fileService } from '@/services/file';
import type { UploadProps } from 'antd';
import { Upload as AntdUpload } from 'antd';
import { useMemo } from 'react';

const accessToken: string = localStorage.getItem('accessToken') || '';

export const UPLOAD_DEFAULT_CONFIG: UploadProps = {
  customRequest(e) {
    const {
      file,
      onProgress = () => {},
      onError = () => {},
      onSuccess = () => {},
    } = e;
    try {
      onProgress({
        percent: 50,
      });
      fileService.upload(file).then((res) => {
        console.log(res);
        onSuccess(res);
      });
    } catch (error: any) {
      onError(error);
    }
  },
};

export const Upload: React.FC<UploadProps> = ({ children, ...rest }) => {
  const uploadConfig = useMemo(
    () => ({ ...UPLOAD_DEFAULT_CONFIG, ...rest }),
    [rest],
  );

  return (
    <AntdUpload disabled={!accessToken} {...uploadConfig}>
      {children}
    </AntdUpload>
  );
};
export default Upload;
