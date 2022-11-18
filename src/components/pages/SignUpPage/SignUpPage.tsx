import React, { useState } from 'react';
import cl from './SignUpPage.module.scss';
import SignUpForm from '../../SighUpForm/SignUpForm';
import { FormValues } from '../../../types/formTypes';
import { useSignUpAuthQuery } from '../../../API/authCalls';
import Modal from '../../../components/Modal/modal';
import ModalFormResponse from '../../Modal/modals/modalFormResponse';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState<FormValues>({ login: '', password: '', name: '' });
  const { isSuccess, isLoading, isError, error } = useSignUpAuthQuery(
    {
      path: 'auth/signup',
      patch: signUpData,
    },
    { skip: !signUpData.login }
  );
  function handleSubmit(data: FormValues) {
    setSignUpData(data);
  }
  return (
    <div className={cl.container}>
      <SignUpForm handlerSubmit={handleSubmit} isLoading={isLoading}></SignUpForm>
      {isSuccess && (
        <Modal>
          <ModalFormResponse></ModalFormResponse>
        </Modal>
      )}
      {isError && (
        <Modal>
          <ModalFormResponse error={error as FetchBaseQueryError}></ModalFormResponse>
        </Modal>
      )}
    </div>
  );
};

export default SignUpPage;
