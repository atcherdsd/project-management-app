import React from 'react';
import cl from './App.module.scss';
import Header from '../UI/Header/Header';
import Footer from '../UI/Footer/Footer';
import AppRouter from '../AppRouter';

const App = () => {
  return (
    <div className={cl.container}>
      <Header />
      <AppRouter />
      <Footer />
    </div>
  );
};

export default App;
