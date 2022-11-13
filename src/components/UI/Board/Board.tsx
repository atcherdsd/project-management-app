import React, { FC } from 'react';
import cl from './Board.module.scss';
import { useNavigate } from 'react-router-dom';

interface IBoardProps {
  owner: string;
  title: string;
  users: string[];
  id: string;
}

const Board: FC<IBoardProps> = ({ id, owner, title }) => {
  const navigate = useNavigate();

  const boardOnClick = () => {
    navigate(`/main/${id}`);
  };
  return (
    <div className={cl.container} onClick={boardOnClick}>
      <h3 className={cl.title}>{title}</h3>
      <h4 className={cl.subtitle}>Created by {owner}</h4>
    </div>
  );
};

export default Board;
