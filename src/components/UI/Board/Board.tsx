import React, { FC } from 'react';
import cl from './Board.module.scss';
import { useNavigate } from 'react-router-dom';

interface IBoardProps {
  board: {
    owner: string;
    title: string;
    users: string[];
    _id: string;
  };
}

const Board: FC<IBoardProps> = ({ board }) => {
  const { _id: id, owner, title } = board;
  const navigate = useNavigate();

  const boardOnClick = () => {
    navigate(`/main/${id}`);
  };

  return (
    <div className={cl.container} onClick={boardOnClick}>
      <h3 className={cl.title}>{title}</h3>
      <h4 className={cl.subtitle}>Created by {owner}</h4>
      <button className={cl.delete}>Delete</button>
    </div>
  );
};

export default Board;
