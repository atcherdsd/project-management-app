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

const SignUpPage = () => {
  const { signUpData } = useAppSelector((state) => state.signUpDataReducer);
  const dispatch = useAppDispatch();
  // const [signUpData, setSignUpData] = useState<FormValues>({ login: '', name: '', password: '' });
  const { isSuccess, isLoading, isError, error } = useSignUpAuthQuery(
    {
      path: 'auth/signup',
      patch: signUpData,
    },
    { skip: !signUpData.login }
  );
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
