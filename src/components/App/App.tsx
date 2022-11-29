import React, { useEffect, useState } from 'react';
import cl from './App.module.scss';
import Header from '../UI/Header/Header';
import Footer from '../UI/Footer/Footer';
import AppRouter from '../AppRouter';
import { useAppDispatch } from '../../hooks/redux';
import { setHasToken } from '../../store/reducers/NavbarReducer';
import { Paths } from '../../helpers/routerPaths';
import { useLocation, useNavigate } from 'react-router-dom';

const App = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  let content;
  if (isLoading) {
    content = (
      <div className={cl.icon_loader_wrapper}>
        <div className={cl.icon_loader}></div>
      </div>
    );
  } else if (!isLoading) {
    content = <AppRouter />;
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setHasToken(true));
      if (location.pathname.includes(Paths.SignIn) || location.pathname.includes(Paths.SignUp))
        navigate(Paths.MainPage);
    }
    setIsLoading(false);
  }, [dispatch, location.pathname, navigate]);

  return (
    <div className={cl.container}>
      <Header />
      {content}
      <Footer />
    </div>
  );
};

export default App;
