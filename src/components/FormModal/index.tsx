import type { FormProps, ModalFuncProps, FormInstance } from 'antd';
import { Modal } from 'antd';
import React from 'react';

export interface FormComponentProps extends FormProps {
  onEvent: (eventName: string) => void;
  formProps?: FormProps & {
    ref?: any;
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
    callback: (formData: T) => Promise<void>,
    onEvent: (eventName: string) => void = () => {},
    modalProps?: ModalFuncProps,
    singleModalKey?: string | undefined,
  ) {
    const formRef = React.createRef<FormInstance>();
    const modal = Modal.confirm({
      ...modalProps,
      content: (
        <FormComponent
          onEvent={onEvent}
          formProps={{
            ref: formRef,
          }}
        />
      ),
      onOk() {
        return new Promise<void>((reslove, reject) => {
          formRef?.current
            ?.validateFields()
            .then((values) => {
              callback(values)
                .then(() => {
                  reslove();
                })
                .catch((error) => {
                  reject(error);
                });
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
