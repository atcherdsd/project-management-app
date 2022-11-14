import React, { useState } from 'react';
import cl from './SignUpPage.module.scss';
import SignUpForm from '../../SighUpForm/SignUpForm';
import { FormValues } from '../../../types/formTypes';
import { useSignUpAuthQuery } from '../../../API/authCalls';
import Modal from '../../../components/Modal/modal';
import SuccsessModal from '../../../components/Modal/modals/succsessModal';

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState<FormValues>({ login: '', name: '', password: '' });
  const { isSuccess, isLoading, isError } = useSignUpAuthQuery(
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
      <SignUpForm handlerSubmit={handleSubmit} isLoading={isLoading} isError={isError}></SignUpForm>
      {isSuccess && (
        <Modal>
          <SuccsessModal></SuccsessModal>
        </Modal>
      )}
    </div>
  );
};

export default SignUpPage;
