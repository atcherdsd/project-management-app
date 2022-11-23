import React, { useMemo } from 'react';
import cl from './confirmModal.module.scss';
import { ModalProp } from 'types/modalType';
import dictionary from '../../../dictionary/index';
import { useTranslate } from '../../../hooks/useTranslate';
import { useAppSelector } from '../../../hooks/redux';
import { IModalLanguage } from 'types/dictionaryTypes';

export default function ConfirmModal(props: ModalProp) {
  const { handler } = props;
  // Use Translate
  const { language } = useAppSelector((state) => state.LanguageReducer);
  const [T, setT] = useTranslate<IModalLanguage>(dictionary.Modal, language);
  useMemo(() => {
    setT();
  }, [language]);
  return (
    <div className={cl.modal__container} onClick={handler}>
      <div className={cl.modal__content}>
        <p>{T.warning}</p>
        <div className={cl.modal__content__buttons}>
          <input type="button" className={cl.confirmButton} defaultValue={T.confirmBtn}></input>
          <input type="button" className={cl.confirmButton} defaultValue={T.disconfirmBtn}></input>
        </div>
      </div>
    </div>
  );
}
