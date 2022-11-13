import React from 'react';
import cl from './succsessModal.module.scss';
export default function SuccsessModal() {
  return (
    <div className={cl.modal__container}>
      <p className={cl.succsess__block}>Succsess</p>
    </div>
  );
}
