import React from 'react';
import cl from './MainPage.module.scss';
import { useGetAllBoardsQuery } from '../../../API/boardsCalls';
import { IBoard } from '../../../types/boardType';
import Board from '../../UI/Board/Board';

const MainPage = () => {
  const { data } = useGetAllBoardsQuery({ path: 'boards' });
  console.log(data);
  return (
    <div className={cl.container}>
      <h2 className={cl.title}>Boards</h2>
      <div className={cl.boardsContainer}>
        {(data as IBoard[])?.map(({ _id, owner, title, users }) => (
          <Board key={_id} id={_id} owner={owner} title={title} users={users} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
