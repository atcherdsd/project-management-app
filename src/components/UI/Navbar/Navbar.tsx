import React from 'react';
import cl from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../../helpers/routerPaths';
import { activeClassHandler } from '../../../helpers/activeClassHandler';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useTranslate } from '../../../hooks/useTranslate';
import { navbarSelector } from '../../../store/selectors/selectors';
import { setMenu } from '../../../store/reducers/NavbarReducer';

const isActiveCheck = ({ isActive }: { isActive: boolean }) =>
  activeClassHandler(isActive, cl.link, cl.link_active);

const Navbar = () => {
  const T = useTranslate();

  const { isOpenedMenu } = useAppSelector(navbarSelector);
  const dispatch = useAppDispatch();

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
        <button className={cl.button}>{T('Navbar.newboard')}</button>
        <button className={cl.button}>{T('Navbar.signout')}</button>
      </nav>
    </div>
  );
};

export default Navbar;
