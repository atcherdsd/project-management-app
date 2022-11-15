import SignInForm from '../../SignInForm/SignInForm';
import React from 'react';
import cl from '../SignUpPage/SignUpPage.module.scss';

const SignInPage = () => {
  return (
    <div className={cl.container}>
      <SignInForm></SignInForm>
    </div>
  );
};

export default SignInPage;
