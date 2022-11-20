import React from 'react';
import cl from './EditProfilePage.module.scss';
import {
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../../../API/editProfileCalls';
import UpdateUserForm from '../../updateUserForm/updateUserForm';
import { FormValues } from 'types/formTypes';
import { useAppDispatch } from '../../../hooks/redux';
import { setSignUpDataToRedux } from '../../../store/reducers/SignUpDataReducer';
import Modal from '../../../components/Modal/modal';
import ModalFormResponse from '../../Modal/modals/modalFormResponse';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../helpers/routerPaths';

const EditProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data: responseData,
    refetch,
  } = useGetUserQuery(
    {
      path: `users/${localStorage.getItem('id')}`,
    },
    { refetchOnMountOrArgChange: true }
  );
  const [updateUser, { isLoading: isUpdating, isError: isErrorUpdating, error: updateError }] =
    useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  // Обновление пользователя
  ////////////////////////////////////
  function handlerSubmit(data: FormValues) {
    updateUser({
      path: `users/${localStorage.getItem('id')}`,
      patch: data,
    })
      .unwrap()
      .then((data) => {
        dispatch(setSignUpDataToRedux(data));
        navigate(`/${Paths.SignIn}`);
      })
      .catch((err) => {
        throw new Error(err.data.message);
      });
    refetch();
  }
  // Удаление пользователя
  /////////////////////////////////
  function deleteUserR() {
    deleteUser({ path: `users/${localStorage.getItem('id')}` });
    navigate(`/${Paths.SignUp}`);
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }
  return (
    <div className={cl.container}>
      <UpdateUserForm
        name={isSuccess ? String(responseData?.name) : ''}
        login={isSuccess ? String(responseData?.login) : ''}
        isLoading={isLoading}
        handlerSubmit={handlerSubmit}
        isSuccess={isSuccess}
        isUpdating={isUpdating}
        deleteUser={deleteUserR}
      ></UpdateUserForm>
      {isErrorUpdating && (
        <Modal>
          <ModalFormResponse error={updateError as FetchBaseQueryError}></ModalFormResponse>
        </Modal>
      )}
    </div>
  );
};

export default EditProfilePage;
