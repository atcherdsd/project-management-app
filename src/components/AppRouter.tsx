import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AuthVerify from './AuthVerify';
import routes from '../helpers/routes';

const AppRouter = () => {
  return (
    <>
      <Routes>
        {routes.public.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
        <Route element={<PrivateRoute />}>
          {routes.private.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Route>
      </Routes>
      <AuthVerify />
    </>
  );
};

export default AppRouter;
