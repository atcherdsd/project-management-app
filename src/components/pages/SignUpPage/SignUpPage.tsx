import React, { useState } from 'react';
import cl from './SignUpPage.module.scss';
import SignUpForm from '../../RegistrationForm/SignUpForm';
import { FormValues } from '../../../types/formTypes';
import { useSignUpAuthQuery } from '../../../API/authCalls';
const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState<FormValues>({ login: '', name: '', password: '' });
  const { data, isError } = useSignUpAuthQuery({ path: 'signup', patch: signUpData });
  console.log(data, isError);
  function handleSubmit(data: FormValues) {
    setSignUpData(data);
  }
  return (
    <div className={cl.container}>
      <SignUpForm handlerSubmit={handleSubmit}></SignUpForm>
    </div>
  );
};

export default SignUpPage;
