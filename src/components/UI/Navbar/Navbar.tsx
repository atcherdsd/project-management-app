import React from 'react';
import cl from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../../helpers/routerPaths';
import { activeClassHandler } from '../../../helpers/activeClassHandler';
import { useAppSelector } from '../../../hooks/redux';
import { NavbarDictionary as ND } from './Navbar.dictionary';

const isActiveCheck = ({ isActive }: { isActive: boolean }) =>
  activeClassHandler(isActive, cl.link, cl.link_active);

const Navbar = () => {
  const { language } = useAppSelector((state) => state.LanguageReducer);
  return (
    <nav className={cl.container}>
      <NavLink className={isActiveCheck} to={Paths.LogInPage}>
        {language === 'EN' ? ND.EN.signinup : ND.RU.signinup}
      </NavLink>
      <NavLink className={isActiveCheck} to={Paths.WelcomePage}>
        {language === 'EN' ? ND.EN.welcome : ND.RU.welcome}
      </NavLink>
      <NavLink className={isActiveCheck} to={Paths.MainPage}>
        {language === 'EN' ? ND.EN.main : ND.RU.main}
      </NavLink>
      <NavLink className={isActiveCheck} to={Paths.EditProfilePage}>
        {language === 'EN' ? ND.EN.edit : ND.RU.edit}
      </NavLink>
    </nav>
  );
};

export default Navbar;
