import React from 'react';
import cl from './RegistrationForm.module.scss';
import { FormProps } from 'types/formTypes';
export default function FormContent(props: FormProps) {
  const { handleSubmit, handleChange } = props;
  return (
    <form action="" className={cl.form} onSubmit={handleSubmit} onChange={handleChange}>
      <p className={cl.form__description}>Get unlimited access to your board</p>
      <div className={cl.form__group}>
        <input
          type="text"
          id={cl.login}
          className={cl.form__input}
          placeholder=" "
          autoComplete="off"
        ></input>
        <label htmlFor={cl.login} className={cl.form__label}>
          Login
        </label>
      </div>
      <div className={cl.form__group}>
        <input type="password" id={cl.password} className={cl.form__input} placeholder=" "></input>
        <label htmlFor={cl.password} className={cl.form__label}>
          Password
        </label>
      </div>
      <div className={cl.form__buttons}>
        <button className={cl.form__button}>Sign Up</button>
        <button className={cl.form__button}>Sign In</button>
      </div>
    </form>
  );
}
