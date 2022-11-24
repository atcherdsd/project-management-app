import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormValues, SignUpProps } from '../../types/formTypes';
import cl from './SignUp.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { useTranslate } from '../../hooks/useTranslate';
import dictionary from '../../dictionary';
import { ISighUpFormLanguage } from 'types/dictionaryTypes';
import { Paths } from '../../helpers/routerPaths';
import Spinner from '../UI/Spinner/Spinner';

function SignUpForm(props: SignUpProps) {
  // Navigate
  const navigate = useNavigate();
  // Use Translate
  const { language } = useAppSelector((state) => state.LanguageReducer);
  const [T, setT] = useTranslate<ISighUpFormLanguage>(dictionary.SighUpForm, language);

  useMemo(() => {
    setT();
  }, [language]);
  // Use Form
  const { handlerSubmit, isLoading } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ criteriaMode: 'all', mode: 'onChange' });
  const onSubmit = handleSubmit((data) => {
    handlerSubmit(data);
    reset({
      name: '',
      login: '',
      password: '',
    });
  });
  return (
    <form action="" className={cl.form} onSubmit={onSubmit}>
      <p className={cl.form__description}>{T.formWelcome}</p>
      <div className={cl.form__group}>
        <input
          type="text"
          id={cl.name}
          className={cl.form__input}
          placeholder=" "
          autoComplete="off"
          defaultValue={''}
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
      <div className={cl.form__login}>
        <input
          type="text"
          id={cl.login}
          className={cl.form__input}
          placeholder=" "
          autoComplete="off"
          defaultValue={''}
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
      <div className={cl.form__buttons}>
        <a onClick={() => navigate(`/${Paths.SignIn}`)}>{T.formRegistered}</a>
        {isLoading && <Spinner></Spinner>}
        <input
          type="submit"
          className={cl.form__button}
          value={T.formSignUp}
          disabled={isLoading ? true : false}
        ></input>
      </div>
    </form>
  );
}

export default SignUpForm;
