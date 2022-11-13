import React from 'react';
import cl from './MainPage.module.scss';
import { useGetAllBoardsQuery } from '../../../API/boardsCalls';

const MainPage = () => {
  const { data, isError, error } = useGetAllBoardsQuery({ path: 'boards' });
  console.log(data);
  return <div className={cl.container}></div>;
};

export default MainPage;
