import React, { useMemo } from 'react';
import cl from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../../helpers/routerPaths';
import { activeClassHandler } from '../../../helpers/activeClassHandler';
import { useAppSelector } from '../../../hooks/redux';
import { useTranslate } from '../../../hooks/useTranslate';
import dictionary from '../../../dictionary';
import { INavbarLanguage } from 'types/dictionaryTypes';

const isActiveCheck = ({ isActive }: { isActive: boolean }) =>
  activeClassHandler(isActive, cl.link, cl.link_active);

const Navbar = () => {
  const { language } = useAppSelector((state) => state.LanguageReducer);
  const [T, setT] = useTranslate<INavbarLanguage>(dictionary.Navbar, language);

  useMemo(() => {
    setT();
  }, [language]);

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
      <button className={cl.button}>{T.newboard}</button>
      <button className={cl.button}>{T.signout}</button>
    </nav>
  );
};

export default Navbar;
