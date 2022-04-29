import type { FormProps, ModalFuncProps, FormInstance } from 'antd';
import { Modal } from 'antd';
import React from 'react';
export * from './SignInForm';
export * from './SignUpForm';

export interface FormComponentProps extends FormProps {
  formProps: FormProps & {
    ref: React.RefObject<FormInstance<any>>;
  };
}
interface FormModalProps {
  FormComponent: React.FC;
  modalProps?: ModalFuncProps;
}

// 表单式对话框
export class FormModal extends React.Component<FormModalProps> {
  static open<T>(
    FormComponent: React.FC<FormComponentProps>,
    callback: (
      formData: T,
      reslove: (value: void | PromiseLike<void>) => void,
      reject: (reason?: any) => void,
    ) => void,
    modalProps?: ModalFuncProps,
    singleModalKey?: string | undefined,
  ) {
    const formRef = React.createRef<FormInstance>();
    // 为了获取context使用封装的modal
    // 查看layout/index.tsx
    const modal = window.modal?.confirm({
      ...modalProps,
      content: (
        <FormComponent
          formProps={{
            ref: formRef,
          }}
        />
      ),
      icon: null,
      onOk() {
        return new Promise<void>((reslove, reject) => {
          formRef?.current
            ?.validateFields()
            .then((values) => {
              callback(values, reslove, reject);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      onCancel() {
        if (!!singleModalKey) {
          delete (window as any)[`formModal-${singleModalKey}`];
        }
      },
      getContainer: document.getElementById('root-layout') || document.body,
    });

    if (!!singleModalKey) {
      (window as any)[`formModal-${singleModalKey}`] = modal;
    }
    return modal;
  }

  render() {
    return (
      <Modal {...this.props.modalProps}>
        <this.props.FormComponent />
      </Modal>
    );
  }
}
