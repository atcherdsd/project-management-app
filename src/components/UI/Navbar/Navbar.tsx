import React, { useMemo } from 'react';
import cl from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../../helpers/routerPaths';
import { activeClassHandler } from '../../../helpers/activeClassHandler';
import { useAppSelector } from '../../../hooks/redux';
import { useTranslate } from '../../../hooks/useTranslate';
import dictionary from '../../../dictionary';
import { INavbarLanguage } from 'types/dictionaryTypes';
import { useCreateNewBoardMutation } from '../../../API/boardsCalls';
import axios from 'axios';
import baseUrl from '../../../API/baseUrl';

const isActiveCheck = ({ isActive }: { isActive: boolean }) =>
  activeClassHandler(isActive, cl.link, cl.link_active);

const Navbar = () => {
  const { language } = useAppSelector((state) => state.LanguageReducer);
  const [T, setT] = useTranslate<INavbarLanguage>(dictionary.Navbar, language);
  const [createNewBoard, {}] = useCreateNewBoardMutation();

  useMemo(() => {
    setT();
  }, [language]);

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

  return (
    <nav className={cl.container}>
      <NavLink className={isActiveCheck} to={Paths.SignIn}>
        {T.signin}
      </NavLink>
      <NavLink className={isActiveCheck} to={Paths.SignUp}>
        {T.signup}
      </NavLink>
      <NavLink className={isActiveCheck} to={Paths.WelcomePage}>
        {T.welcome}
      </NavLink>
      <NavLink className={isActiveCheck} to={Paths.MainPage}>
        {T.main}
      </NavLink>
      <NavLink className={isActiveCheck} to={Paths.EditProfilePage}>
        {T.edit}
      </NavLink>
      <button className={cl.button} onClick={onClickCreateNewBoard}>
        {T.newboard}
      </button>
      <button className={cl.button} onClick={signUp}>
        {T.signout}
      </button>
    </nav>
  );
};

export default Navbar;
