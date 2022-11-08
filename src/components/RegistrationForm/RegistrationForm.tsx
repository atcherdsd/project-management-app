import React, { useState } from 'react';
import FormContent from './FormContent';
function RegistrationForm() {
  //   const [login, setLogin] = useState('');
  //   const [password, setPassword] = useState('');
  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement;
    console.log(target.value);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // e.preventDefault();
    console.log(e);
  }
  return <FormContent handleSubmit={handleSubmit} handleChange={handleChange}></FormContent>;
}

export default RegistrationForm;
