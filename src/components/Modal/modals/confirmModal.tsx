import React from 'react';
import cl from './confirmModal.module.scss';
import { ModalProp } from 'types/modalType';
import { useTranslate } from '../../../hooks/useTranslate';

export default function ConfirmModal(props: ModalProp) {
  const { handler } = props;
  const T = useTranslate();
  return (
    <div className={cl.modal__container} onClick={handler}>
      <div className={cl.modal__content}>
        <p>{T('Modal.warning')}</p>
        <div className={cl.modal__content__buttons}>
          <input
            type="button"
            className={cl.confirmButton}
            defaultValue={T('Modal.confirmBtn')}
          ></input>
          <input
            type="button"
            className={cl.confirmButton}
            defaultValue={T('Modal.disconfirmBtn')}
          ></input>
        </div>
      </div>
    </div>
  );
}
