import React, { MouseEventHandler } from 'react';
import cl from './genericModal.module.scss';
import { ModalProp } from 'types/modalType';

export default function GenericModal(props: ModalProp) {
  const { handler } = props;
  return (
    <div className={cl.modal__container} onClick={handler}>
      <div className={cl.modal__content}>
        <p>Are you sure?</p>
        <div className={cl.modal__content__buttons}>
          <input type="button" className={cl.confirmButton} defaultValue={'Yes'}></input>
          <input type="button" className={cl.confirmButton} defaultValue={'No'}></input>
        </div>
      </div>
    </div>
  );
}
