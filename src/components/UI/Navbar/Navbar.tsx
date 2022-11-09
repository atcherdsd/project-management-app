import React from 'react';
import cl from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../../helpers/routerPaths';
import { activeClassHandler } from '../../../helpers/activeClassHandler';

const isActiveCheck = ({ isActive }: { isActive: boolean }) =>
  activeClassHandler(isActive, cl.link, cl.link_active);

const Navbar = () => {
  return (
    <nav className={cl.container}>
      <NavLink className={isActiveCheck} to={Paths.LogInPage}>
        Sign In/Sign Up
      </NavLink>
      <NavLink className={isActiveCheck} to={Paths.WelcomePage}>
        Welcome
      </NavLink>
      <NavLink className={isActiveCheck} to={Paths.MainPage}>
        Main
      </NavLink>
    </nav>
  );
};

export default Navbar;
