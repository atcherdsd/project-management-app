import React from 'react';
import cl from './Header.module.scss';
import Navbar from '../Navbar/Navbar';

const Header = () => {
  return (
    <header className={cl.container}>
      <Navbar />
    </header>
  );
};

export default Header;
