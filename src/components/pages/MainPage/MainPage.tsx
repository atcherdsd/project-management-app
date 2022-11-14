import React from 'react';
import cl from './MainPage.module.scss';
import { useGetAllBoardsQuery } from '../../../API/boardsCalls';
import { IBoard } from '../../../types/boardType';
import Board from '../../UI/Board/Board';

const MainPage = () => {
  const { data } = useGetAllBoardsQuery(null);
  return (
    <div className={cl.container}>
      <h1 className={cl.title}>Boards</h1>
      <div className={cl.boardsContainer}>
        {data && (data as IBoard[]).map((board) => <Board key={board._id} board={board} />)}
      </div>
    </div>
  );
};

export default MainPage;
