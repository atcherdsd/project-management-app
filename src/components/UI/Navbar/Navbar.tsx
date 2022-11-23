import React from 'react';
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

const isActiveCheck = ({ isActive }: { isActive: boolean }) =>
  activeClassHandler(isActive, cl.link, cl.link_active);

const Navbar = () => {
  const T = useTranslate();
  const [createNewBoard, {}] = useCreateNewBoardMutation();

  const { isOpenedMenu } = useAppSelector(navbarSelector);
  const dispatch = useAppDispatch();

  const onClickCreateNewBoard = async () => {
    const body = {
      title: `NewBoards ${Date.now()}`,
      owner: 'Artur',
      users: ['Artur'],
    };
    createNewBoard(body);
  };

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
    </div>
  );
};

export default Navbar;
