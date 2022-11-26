import React from 'react';
import cl from './AddBoard.module.scss';
import { useCreateNewBoardMutation } from '../../../API/boardsCalls';

const AddBoard = () => {
  const [createNewBoard, {}] = useCreateNewBoardMutation();

  const onClickCreateNewBoard = async () => {
    const body = {
      title: `NewBoards ${Date.now()}`,
      owner: 'Artur',
      users: ['Artur'],
    };
    createNewBoard(body);
  };
  return (
    <button className={cl.container} onClick={onClickCreateNewBoard}>
      <div className={cl.circle}>
        <h2 className={cl.text}>Add</h2>
      </div>
    </button>
  );
};

export default AddBoard;
