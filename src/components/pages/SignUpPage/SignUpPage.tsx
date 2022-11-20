import React, { useState } from 'react';
import cl from './SignUpPage.module.scss';
import SignUpForm from '../../SighUpForm/SignUpForm';
import { ResponseStateSignUp, FormValues } from '../../../types/formTypes';
import { useSignUpAuthQuery } from '../../../API/authCalls';
import Modal from '../../../components/Modal/modal';
import ModalFormResponse from '../../Modal/modals/modalFormResponse';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../helpers/routerPaths';
import { useAppDispatch } from '../../../hooks/redux';
import { setSignUpDataToRedux } from '../../../store/reducers/SignUpDataReducer';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState<FormValues>({ login: '', password: '', name: '' });
  const dispatch = useAppDispatch();
  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: responseData,
  } = useSignUpAuthQuery(
    {
      path: 'auth/signup',
      patch: signUpData,
    },
    { skip: !signUpData.login }
  );
  if (responseData) {
    setTimeout(() => {
      dispatch(setSignUpDataToRedux(responseData as ResponseStateSignUp));
      navigate(`/${Paths.SignIn}`);
    }, 3000);
  }
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
