import React, { useEffect } from 'react';
import cl from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../../helpers/routerPaths';
import { activeClassHandler } from '../../../helpers/activeClassHandler';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useTranslate } from '../../../hooks/useTranslate';
import dictionary from '../../../dictionary';
import { INavbarLanguage } from '../../../types/dictionaryTypes';
import { navbarSelector } from '../../../store/selectors/selectors';
import { setMenu } from '../../../store/reducers/NavbarReducer';

const isActiveCheck = ({ isActive }: { isActive: boolean }) =>
  activeClassHandler(isActive, cl.link, cl.link_active);

const Navbar = () => {
  const { language } = useAppSelector((state) => state.LanguageReducer);
  const [T, setT] = useTranslate<INavbarLanguage>(dictionary.Navbar, language);

  const { isOpenedMenu } = useAppSelector(navbarSelector);
  const dispatch = useAppDispatch();

  const handleMenuClick = () => {
    isOpenedMenu ? dispatch(setMenu(!isOpenedMenu)) : null;
  };

  useEffect(() => {
    setT();
  }, [language, setT]);

  return (
    <div className={isOpenedMenu ? `${cl.overlay}` : ''} onClick={handleMenuClick}>
      <nav className={isOpenedMenu ? `${cl.container_opened_menu}` : `${cl.container}`}>
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
    </div>
  );
};

export default Navbar;
