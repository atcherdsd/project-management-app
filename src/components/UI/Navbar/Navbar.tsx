import React, { useEffect, useState } from 'react';
import cl from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../../helpers/routerPaths';
import { activeClassHandler } from '../../../helpers/activeClassHandler';
import { useTranslate } from '../../../hooks/useTranslate';
import { useCreateNewBoardMutation } from '../../../API/boardsCalls';
import axios from 'axios';
import baseUrl from '../../../API/baseUrl';
import { navbarSelector } from '../../../store/selectors/selectors';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setMenu } from '../../../store/reducers/NavbarReducer';
import { Modal } from '../../../components/Modal/modal';
import CreacteNewBoardModal from '../../../components/Modal/modals/createNewBoardModal';
import { CreateBoardModalForm } from '../../../types/modalType';

const isActiveCheck = ({ isActive }: { isActive: boolean }) =>
  activeClassHandler(isActive, cl.link, cl.link_active);

const Navbar = () => {
  const T = useTranslate();
  const [createNewBoard, { isLoading }] = useCreateNewBoardMutation();
  const { isOpenedMenu } = useAppSelector(navbarSelector);
  const dispatch = useAppDispatch();
  //State for open or close window
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (!isLoading) {
      setModalOpen(false);
    }
  }, [isLoading]);
  // Submit or Cancel handler for modal form
  ///////////////////////
  function submitHandler(data: CreateBoardModalForm) {
    const { title } = data;
    const body = {
      title: `${title}`,
      owner: 'Nikita',
      users: ['Nikita'],
    };
    createNewBoard(body);
  }

  const onClickCreateNewBoard = async () => {
    // const body = {
    //   title: `NewBoards ${Date.now()}`,
    //   owner: 'Artur',
    //   users: ['Artur'],
    // };
    // createNewBoard(body);
    setModalOpen(true);
  };

  function clickHandler(e: React.MouseEvent<HTMLInputElement>) {
    const input = (e.target as HTMLElement).closest('input');
    const value = input?.value;
    if (value && (value == 'Cancel' || value == 'Отмена')) {
      setModalOpen(false);
    }
  }

  const signUp = async () => {
    const body = {
      login: 'agtugchik',
      password: '1qwer1',
    };
    const answer = await axios.post(`${baseUrl}/auth/signin`, body, {
      headers: {
        Accept: 'application/json',
      },
    });
    console.log(answer.data);
  };
  const handleMenuClick = () => {
    isOpenedMenu ? dispatch(setMenu(!isOpenedMenu)) : null;
  };
  return (
    <div className={isOpenedMenu ? `${cl.overlay}` : ''} onClick={handleMenuClick}>
      <nav className={isOpenedMenu ? `${cl.container_opened_menu}` : `${cl.container}`}>
        <NavLink className={isActiveCheck} to={Paths.SignIn}>
          {T('Navbar.signin')}
        </NavLink>
        <NavLink className={isActiveCheck} to={Paths.SignUp}>
          {T('Navbar.signup')}
        </NavLink>
        <NavLink className={isActiveCheck} to={Paths.WelcomePage}>
          {T('Navbar.welcome')}
        </NavLink>
        <NavLink className={isActiveCheck} to={Paths.MainPage}>
          {T('Navbar.main')}
        </NavLink>
        <NavLink className={isActiveCheck} to={Paths.EditProfilePage}>
          {T('Navbar.edit')}
        </NavLink>
        <button className={cl.button} onClick={onClickCreateNewBoard}>
          {T('Navbar.newboard')}
        </button>
        <button className={cl.button} onClick={signUp}>
          {T('Navbar.signout')}
        </button>
      </nav>
      {isModalOpen && (
        <Modal>
          <CreacteNewBoardModal
            submitHandler={submitHandler}
            isLoading={isLoading}
            clickHandler={clickHandler}
          ></CreacteNewBoardModal>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
