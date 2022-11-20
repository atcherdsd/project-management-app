import Spinner from '../../components/UI/Spinner/Spinner';
import dictionary from '../../dictionary/index';
import { useAppSelector } from '../../hooks/redux';
import { useTranslate } from '../../hooks/useTranslate';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ISighUpFormLanguage } from 'types/dictionaryTypes';
import { UpdateProps, FormValues } from 'types/formTypes';
import cl from '../updateUserForm/UpdateForm.module.scss';
import GenericModal from '../Modal/modals/genericModal';
import Modal from '../Modal/modal';

function UpdateUserForm(props: UpdateProps) {
  const {
    handlerSubmit,
    isLoading,
    login,
    name,
    isSuccess,
    isUpdating,
    deleteUser,
    isModalOpen,
    confirmDeleteUser,
  } = props;
  // Use Translate
  const { language } = useAppSelector((state) => state.LanguageReducer);
  const [T, setT] = useTranslate<ISighUpFormLanguage>(dictionary.SighUpForm, language);
  useMemo(() => {
    setT();
  }, [language]);
  // Use Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ criteriaMode: 'all', mode: 'onChange' });

  const onSubmit = handleSubmit((data) => {
    handlerSubmit(data);
  });
  return (
    <>
      <form action="" className={cl.form} onSubmit={onSubmit}>
        <p className={cl.form__description}>{T.edit}</p>
        {isSuccess && (
          <div className={cl.form__group}>
            <input
              type="text"
              id={cl.name}
              className={cl.form__input}
              placeholder=" "
              autoComplete="off"
              defaultValue={isSuccess ? name : ''}
              {...register('name', {
                required: { value: true, message: `${T.formRequireMsg}` },
                pattern: {
                  value: /^[a-zA-Zа-я\s]+$/i,
                  message: `${T.formOnlyLetter}`,
                },
                minLength: { value: 2, message: `${T.formMinLegthNameMsg}` },
              })}
            ></input>
            <label htmlFor={cl.name} className={cl.form__label}>
              {T.formLabelName}
            </label>
            {errors.name?.types &&
              Object.entries(errors.name?.types).map(([type, message]) => (
                <p key={type} className={cl.error}>
                  {message}
                </p>
              ))}
          </div>
        )}
        {isSuccess && (
          <div className={cl.form__login}>
            <input
              type="text"
              id={cl.login}
              className={cl.form__input}
              placeholder=" "
              autoComplete="off"
              defaultValue={login}
              {...register('login', {
                required: { value: true, message: `${T.formRequireMsg}` },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/i,
                  message: `${T.formLoginPatternMsg}`,
                },
                minLength: { value: 5, message: `${T.formMinLengthMsg}` },
              })}
            ></input>
            <label htmlFor={cl.login} className={cl.form__label}>
              {T.formLogin}
            </label>
            {errors.login?.types &&
              Object.entries(errors.login?.types).map(([type, message]) => (
                <p key={type} className={cl.error}>
                  {message}
                </p>
              ))}
          </div>
        )}
        {isSuccess && (
          <div className={cl.form__password}>
            <input
              type="password"
              id={cl.password}
              className={cl.form__input}
              placeholder=" "
              {...register('password', {
                required: { value: true, message: `${T.formRequireMsg}` },
                pattern: {
                  value: /^[\w+а-я0-9]+$/i,
                  message: `${T.formLoginPatternMsg}`,
                },
                minLength: { value: 5, message: `${T.formMinLengthMsg}` },
                validate: (password: string) => {
                  const reg = /\d+/;
                  if (!reg.test(password) && password.length > 0)
                    return `${T.formPasswordValidateMsg}`;
                },
              })}
            ></input>
            <label htmlFor={cl.password} className={cl.form__label}>
              {T.formPassword}
            </label>
            {errors.password?.types &&
              Object.entries(errors.password?.types).map(([type, message]) => (
                <p key={type} className={cl.error}>
                  {message}
                </p>
              ))}
          </div>
        )}
        {isSuccess && (
          <div className={cl.form__buttons}>
            {isUpdating && <Spinner></Spinner>}
            <input
              type="submit"
              className={cl.form__button}
              value={T.updateBtn}
              disabled={isUpdating ? true : false}
            ></input>
            <input
              type="button"
              className={cl.form__deleteButton}
              defaultValue={T.deleteBtn}
              disabled={isLoading ? true : false}
              onClick={deleteUser}
            ></input>
          </div>
        )}
      </form>
      {isModalOpen && (
        <Modal>
          <GenericModal handler={confirmDeleteUser}></GenericModal>
        </Modal>
      )}
    </>
  );
}

export default UpdateUserForm;
