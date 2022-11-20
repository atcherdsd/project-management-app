import React, { MouseEventHandler } from 'react';
import cl from './genericModal.module.scss';
import { ModalProp } from 'types/modalType';

export default function GenericModal(props: ModalProp) {
  const { handler } = props;
  return (
    <div className="modal-container" onClick={handler}>
      <div className="modal-content"></div>
    </div>
  );
}
