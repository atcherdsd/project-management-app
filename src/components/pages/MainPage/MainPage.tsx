import React from 'react';
import cl from './MainPage.module.scss';
import { useGetAllBoardsQuery } from '../../../API/boardsCalls';
import { IBoard } from '../../../types/boardTypes';
import Board from '../../UI/Board/Board';
import { useTranslate } from '../../../hooks/useTranslate';

const MainPage = () => {
  const T = useTranslate();
  const { data } = useGetAllBoardsQuery(null);
  return (
    <div className={cl.container}>
      <h1 className={cl.title}>{T('MainPage.boards')}</h1>
      <div className={cl.boardsContainer}>
        {data && (data as IBoard[]).map((board) => <Board key={board._id} board={board} />)}
      </div>
    </div>
  );
};

export default MainPage;
