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

const EditProfilePage = () => {
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
  const [updateUser, { isLoading: isUpdating, data: updatingData }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const dispatch = useAppDispatch();
  function handlerSubmit(data: FormValues) {
    // setUpdateData(data);
    updateUser({
      path: `users/${localStorage.getItem('id')}`,
      patch: data,
    })
      .unwrap()
      .then((data) => dispatch(setSignUpDataToRedux(data)));
    refetch();
  }
  function deleteUserR() {
    deleteUser({ path: `users/${localStorage.getItem('id')}` });
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
    </div>
  );
};

export default EditProfilePage;
