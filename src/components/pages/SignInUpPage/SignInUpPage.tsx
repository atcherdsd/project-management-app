import React from 'react';
import cl from './SignInUpPage.module.scss';
import SignUpForm from '../../RegistrationForm/SignUpForm';
const SignInUpPage = () => {
  return (
    <div className={cl.container}>
      <SignUpForm></SignUpForm>
    </div>
  );
};

export default SignInUpPage;
