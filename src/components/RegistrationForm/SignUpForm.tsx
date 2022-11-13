import React from 'react';
import { useForm } from 'react-hook-form';
import { FormValues, SignUpProps } from '../../types/formTypes';
import cl from './RegistrationForm.module.scss';
function SignUpForm(props: SignUpProps) {
  const { handlerSubmit } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ criteriaMode: 'all', mode: 'onChange' });
  const onSubmit = handleSubmit(handlerSubmit);
  return (
    <form action="" className={cl.form} onSubmit={onSubmit}>
      <p className={cl.form__description}>Get unlimited access to your board</p>
      <div className={cl.form__group}>
        <input
          type="text"
          id={cl.name}
          className={cl.form__input}
          placeholder=" "
          autoComplete="off"
          defaultValue={''}
          {...register('name', {
            required: { value: true, message: 'This field is required' },
            pattern: {
              value: /^[a-zA-Zа-я\s]+$/i,
              message: 'Should contains only letters',
            },
            minLength: { value: 2, message: 'Should contains greater then 2 symbols' },
          })}
        ></input>
        <label htmlFor={cl.name} className={cl.form__label}>
          Name
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
            required: { value: true, message: 'This field is required' },
            pattern: {
              value: /^[a-zA-Z0-9]+$/i,
              message: 'Should contains english letters and(or) numbers',
            },
            minLength: { value: 5, message: 'Should contains greater then 5 symbols' },
          })}
        ></input>
        <label htmlFor={cl.login} className={cl.form__label}>
          Login
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
            required: { value: true, message: 'This field is required' },
            pattern: {
              value: /^[\w+а-я0-9]+$/i,
              message: 'Should contains letters and(or) numbers',
            },
            minLength: { value: 5, message: 'Should contains greater then 5 symbols' },
            validate: (password: string) => {
              const reg = /\d+/;
              if (!reg.test(password) && password.length > 0)
                return 'Should contains one or greater then numbers';
            },
          })}
        ></input>
        <label htmlFor={cl.password} className={cl.form__label}>
          Password
        </label>
        {errors.password?.types &&
          Object.entries(errors.password?.types).map(([type, message]) => (
            <p key={type} className={cl.error}>
              {message}
            </p>
          ))}
      </div>
      <div className={cl.form__buttons}>
        <input type="submit" className={cl.form__button} value="Sign Up"></input>
      </div>
    </form>
  );
}

export default SignUpForm;
