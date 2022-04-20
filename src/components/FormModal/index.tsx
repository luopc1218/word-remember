import type { FormProps, ModalFuncProps, ModalProps, FormInstance } from 'antd';
import { Modal } from 'antd';
import React from 'react';

type FormComponentType<T = any> = React.FC<
  FormProps<T> & {
    formProps?: FormProps;
  }
>;

interface FormModalProps {
  FormComponent: FormComponentType;
  modalProps: ModalProps;
}

// 表单式对话框
export class FormModal extends React.Component<FormModalProps> {
  /**
   * 函数式创建FormModal
   * @param FormComponent 表单组件
   * @param modalProps Modal组件Props
   * @param singleModalKey 唯一Modal的key，不需要唯一则不传
   * @returns Promise，表单提交会reslove，modal关闭会reject
   */
  static open<T>(
    FormComponent: FormComponentType<T>,
    modalProps?: ModalFuncProps,
    singleModalKey?: string | undefined,
  ) {
    const formRef = React.createRef<FormInstance>();

    console.log(singleModalKey);

    return new Promise<T>((resolve, reject) => {
      const formProps = {
        ref: formRef,
        onFinish: (values: T) => {
          resolve(values);
        },
      };

      const modal = Modal.confirm({
        ...modalProps,
        content: <FormComponent formProps={formProps} />,
        onOk() {
          formRef?.current?.submit();
        },
        onCancel() {
          if (!!singleModalKey) {
            delete (window as any)[`formModal-${singleModalKey}`];
          }
          reject();
        },
      });
      if (!!singleModalKey) {
        (window as any)[`formModal-${singleModalKey}`] = modal;
      }
    });
  }

  render() {
    return (
      <Modal {...this.props.modalProps}>
        <this.props.FormComponent />
      </Modal>
    );
  }
}
