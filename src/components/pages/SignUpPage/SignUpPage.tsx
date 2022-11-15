import React from 'react';
import cl from './SignUpPage.module.scss';
import SignUpForm from '../../SighUpForm/SignUpForm';
import { FormValues } from '../../../types/formTypes';
import { useSignUpAuthQuery } from '../../../API/authCalls';
import Modal from '../../../components/Modal/modal';
import ModalFormResponse from '../../Modal/modals/modalFormResponse';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setSignUpData } from '../../../store/reducers/SignUpDataReducer';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import setSignUpDataToLS from '../../../helpers/setSignUpDataToLS';

const SignUpPage = () => {
  const { signUpData } = useAppSelector((state) => state.signUpDataReducer);
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
    setSignUpDataToLS(responseData as unknown as FormValues);
  }
  function handleSubmit(data: FormValues) {
    dispatch(setSignUpData(data));
  }
  return (
    <div className={cl.container}>
      <SignUpForm handlerSubmit={handleSubmit} isLoading={isLoading}></SignUpForm>
      {!isError && isSuccess && (
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
