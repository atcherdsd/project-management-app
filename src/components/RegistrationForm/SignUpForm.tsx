import React from 'react';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../types/formTypes';
import cl from './RegistrationForm.module.scss';
function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ criteriaMode: 'all', mode: 'onChange' });
  const onSubmit = handleSubmit((data) => console.log(data));
  console.log(errors);
  return (
    <form action="" className={cl.form} onSubmit={onSubmit}>
      <p className={cl.form__description}>Get unlimited access to your board</p>
      <div className={cl.form__group}>
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
              value: /^[\w+а-я0-9]+$/i,
              message: 'Should contains letters and(or) numbers',
            },
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
