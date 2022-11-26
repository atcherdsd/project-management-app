import React from 'react';
import { useForm } from 'react-hook-form';
import { CreateBoardModalForm, CreacteNewBoardModalProps } from '../../../types/modalType';
import cl from './creacteNewBoardModal.module.scss';
import { useTranslate } from '../../../hooks/useTranslate';
import Spinner from '../../UI/Spinner/Spinner';

export default function CreacteNewTaskModal(props: CreacteNewBoardModalProps) {
  const { submitHandler, isLoading, clickHandler } = props;
  // Use Translate
  const T = useTranslate();
  // Use Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBoardModalForm>({ criteriaMode: 'all', mode: 'onChange' });
  // Submit handler
  ///////////////////////////
  const onSubmit = handleSubmit(submitHandler);
  return (
    <div className={cl.modal__container} onClick={clickHandler}>
      <div className={cl.modal__content}>
        <form className={cl.form} onSubmit={onSubmit}>
          <div className={cl.form__group}>
            <input
              type="text"
              id={cl.title}
              className={cl.form__input}
              placeholder=" "
              autoComplete="off"
              defaultValue={''}
              {...register('title', {
                required: { value: true, message: `${T('SignUpForm.formRequireMsg')}` },
                pattern: {
                  value: /^[a-zA-Zа-я\s]+$/i,
                  message: `${T('SignUpForm.formOnlyLetter')}`,
                },
                minLength: { value: 2, message: `${T('SignUpForm.formMinLegthNameMsg')}` },
              })}
            ></input>
            <label htmlFor={cl.title} className={cl.form__label}>
              {T('Modal.title')}
            </label>
            {errors.title?.types &&
              Object.entries(errors.title?.types).map(([type, message]) => (
                <p key={type} className={cl.error}>
                  {message}
                </p>
              ))}
          </div>
          <div className={cl.form__buttons}>
            {isLoading && <Spinner></Spinner>}
            <input
              type="submit"
              className={cl.form__button}
              value={T('Modal.createColumnBtn')}
              disabled={isLoading ? true : false}
            ></input>
            <input
              type="button"
              id="cancelBtn"
              className={cl.form__button}
              value={T('Modal.cancelBtn')}
              disabled={isLoading ? true : false}
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
