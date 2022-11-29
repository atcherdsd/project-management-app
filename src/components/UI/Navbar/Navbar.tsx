import React, { useEffect, useState } from 'react';
import cl from './Navbar.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { Paths } from '../../../helpers/routerPaths';
import { activeClassHandler } from '../../../helpers/activeClassHandler';
import { useTranslate } from '../../../hooks/useTranslate';
import { useCreateNewBoardMutation } from '../../../API/boardsCalls';
// import axios from 'axios';
// import baseUrl from '../../../API/baseUrl';
import { navbarSelector } from '../../../store/selectors/selectors';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { removeUserData, setMenu } from '../../../store/reducers/NavbarReducer';
import { Modal } from '../../../components/Modal/modal';
import CreacteNewBoardModal from '../../../components/Modal/modals/createNewBoardModal';
import { CreateBoardModalForm, UsersState, TranformUsersResponse } from '../../../types/modalType';
import { useGetUsersQuery } from '../../../API/usersCalls';
import { filterUsers } from '../../../helpers/filterUsersResponse';

const isActiveCheck = ({ isActive }: { isActive: boolean }) =>
  activeClassHandler(isActive, cl.link, cl.link_active);

const Navbar = () => {
  const T = useTranslate();
  const [createNewBoard, { isLoading }] = useCreateNewBoardMutation();
  const { hasToken, isOpenedMenu } = useAppSelector(navbarSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const { data: responseUsers, isFetching: isUserLoading } = useGetUsersQuery('/users', {
    skip: !isModalOpen,
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (!isLoading) {
      setModalOpen(false);
    }
    return setInvitedUsers([]);
  }, [isLoading]);
  // Use state for autocomplete
  ////////////////////////////
  const [autoCompContent, setAutoCompContent] = useState<UsersState>({
    filteredOptions: [],
    currentValue: '',
  });
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const currentValue = (e.target as HTMLInputElement).value;
    setAutoCompContent({
      currentValue: currentValue,
      filteredOptions: filterUsers((responseUsers as TranformUsersResponse).users, currentValue),
    });
  }

  function onClickChooseUser(e: React.MouseEvent<HTMLParagraphElement>) {
    const choosenUser = (e.target as HTMLParagraphElement).textContent;
    setInvitedUsers((prevState) => {
      if (prevState.includes(String(choosenUser))) return prevState;
      else return [...prevState, String(choosenUser)];
    });
    setAutoCompContent((prevState) => {
      return { ...prevState, currentValue: '' };
    });
  }
  // Submit or Cancel handler for modal form
  ///////////////////////
  function submitHandler(data: CreateBoardModalForm) {
    const { title } = data;
    const body = {
      title: `${title}`,
      owner: (responseUsers as TranformUsersResponse).currentUser?.login,
      users: invitedUsers,
    };
    createNewBoard(body);
  }

  const onClickCreateNewBoard = async () => {
    setModalOpen(true);
  };

  function clickHandler(e: React.MouseEvent<HTMLInputElement>) {
    const input = (e.target as HTMLElement).closest('input');
    const value = input?.value;
    if (value && (value == 'Cancel' || value == 'Отмена')) {
      setModalOpen(false);
    }
  }

  function removeUserOnClick(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    if (target.tagName == 'IMG') {
      const removeUser = (target.previousSibling as HTMLParagraphElement).textContent;
      setInvitedUsers((prevState) => {
        return prevState.filter((invitedUser) => {
          return invitedUser !== removeUser;
        });
      });
    }
  }

  // const signUp = async () => {
  //   const body = {
  //     login: 'agtugchik',
  //     password: '1qwer1',
  //   };
  //   const answer = await axios.post(`${baseUrl}/auth/signin`, body, {
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //   });
  //   console.log(answer.data);
  // };
  const handleMenuClick = () => {
    isOpenedMenu ? dispatch(setMenu(!isOpenedMenu)) : null;
  };
  const signOut = () => {
    dispatch(removeUserData());
    navigate('/');
  };

  return (
    <div className={isOpenedMenu ? `${cl.overlay}` : ''} onClick={handleMenuClick}>
      <nav className={isOpenedMenu ? `${cl.container_opened_menu}` : `${cl.container}`}>
        {isLoading && <div></div>}
        {!hasToken && !isLoading && (
          <>
            <NavLink className={isActiveCheck} to={Paths.WelcomePage}>
              {T('Navbar.welcome')}
            </NavLink>
            <NavLink className={isActiveCheck} to={Paths.SignIn}>
              {T('Navbar.signin')}
            </NavLink>
            <NavLink className={isActiveCheck} to={Paths.SignUp}>
              {T('Navbar.signup')}
            </NavLink>
          </>
        )}
        {hasToken && !isLoading && (
          <>
            <NavLink className={isActiveCheck} to={Paths.MainPage}>
              {T('Navbar.main')}
            </NavLink>
            <NavLink className={isActiveCheck} to={Paths.EditProfilePage}>
              {T('Navbar.edit')}
            </NavLink>
            <button className={cl.button} onClick={onClickCreateNewBoard}>
              {T('Navbar.newboard')}
            </button>
            <button className={cl.button} onClick={signOut}>
              {T('Navbar.signout')}
            </button>
          </>
        )}
      </nav>
      {isModalOpen && (
        <Modal>
          <CreacteNewBoardModal
            submitHandler={submitHandler}
            isLoading={isLoading}
            clickHandler={clickHandler}
            handleChange={handleChange}
            autoCompContent={autoCompContent.currentValue}
            filteredUsers={autoCompContent.filteredOptions}
            onClickChooseUser={onClickChooseUser}
            invitedUsers={invitedUsers}
            removeUserOnClick={removeUserOnClick}
            isUserLoading={isUserLoading}
          ></CreacteNewBoardModal>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
