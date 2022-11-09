import React from 'react';
import Authors from './Authors/Authors';
import Copyright from './Copyright/Copyright';
import cl from './Footer.module.scss';
import Logo from './Logo/Logo';

const Footer = () => {
  return (
    <footer className={cl.container}>
      <Logo />
      <Authors />
      <Copyright />
    </footer>
  );
};

export default Footer;
