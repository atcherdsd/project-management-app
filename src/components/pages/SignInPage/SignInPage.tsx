import SignInForm from '../../SignInForm/SignInForm';
import React, { useState } from 'react';
import cl from '../SignUpPage/SignUpPage.module.scss';
import { FormValues, Body } from 'types/formTypes';
import { useSignInAuthQuery } from '../../../API/authCalls';
import Modal from '../../../components/Modal/modal';
import ModalFormResponse from '../../Modal/modals/modalFormResponse';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../helpers/routerPaths';

const SignInPage = () => {
  const [signInData, setSignInData] = useState<FormValues>({ login: '', password: '' });
  const navigate = useNavigate();
  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: responseData,
  } = useSignInAuthQuery(
    {
      path: 'auth/signin',
      patch: signInData,
    },
    { skip: !signInData.login }
  );
  if (isSuccess) {
    const { token, _id } = responseData as unknown as Body;
    localStorage.setItem('token', token);
    localStorage.setItem('id', _id);
    setTimeout(() => {
      navigate(`/${Paths.MainPage}`);
    }, 1000);
  }
  function handleSubmit(data: FormValues) {
    setSignInData(data);
  }
  return (
    <div className={cl.container}>
      <SignInForm handlerSubmit={handleSubmit} isLoading={isLoading}></SignInForm>
      {isError && (
        <Modal>
          <ModalFormResponse error={error as FetchBaseQueryError}></ModalFormResponse>
        </Modal>
      )}
    </div>
  );
};

export default SignInPage;
