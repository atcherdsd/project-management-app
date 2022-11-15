import Spinner from '../../components/UI/Spinner/Spinner';
import dictionary from '../../dictionary/index';
import { useAppSelector } from '../../hooks/redux';
import { useTranslate } from '../../hooks/useTranslate';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ISighUpFormLanguage } from 'types/dictionaryTypes';
import { SignUpProps, FormValues } from 'types/formTypes';
import cl from '../SighUpForm/SignUp.module.scss';

function SignInForm(props: SignUpProps) {
  const { signUpData } = useAppSelector((state) => state.signUpDataReducer);
  const { handlerSubmit, isLoading } = props;
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
    reset,
  } = useForm<FormValues>({ criteriaMode: 'all', mode: 'onChange' });
  const onSubmit = handleSubmit((data) => {
    handlerSubmit(data);
    reset({
      login: '',
      password: '',
    });
  });
  return (
    <form action="" className={cl.form} onSubmit={onSubmit}>
      <p className={cl.form__description}>{T.formWelcome}</p>
      <div className={cl.form__login}>
        <input
          type="text"
          id={cl.login}
          className={cl.form__input}
          placeholder=" "
          autoComplete="off"
          defaultValue={signUpData.login}
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
      <div className={cl.form__password}>
        <input
          type="password"
          id={cl.password}
          className={cl.form__input}
          placeholder=" "
          defaultValue={signUpData.password}
          {...register('password', {
            required: { value: true, message: `${T.formRequireMsg}` },
            pattern: {
              value: /^[\w+а-я0-9]+$/i,
              message: `${T.formLoginPatternMsg}`,
            },
            minLength: { value: 5, message: `${T.formMinLengthMsg}` },
            validate: (password: string) => {
              const reg = /\d+/;
              if (!reg.test(password) && password.length > 0) return `${T.formPasswordValidateMsg}`;
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
      <div className={cl.form__signInButtons}>
        {isLoading && <Spinner></Spinner>}
        <input
          type="submit"
          className={cl.form__button}
          value={T.formSignIn}
          disabled={isLoading ? true : false}
        ></input>
      </div>
    </form>
  );
}

export default SignInForm;
