import React, { FC } from 'react';
import cl from './Board.module.scss';

interface IBoardProps {
  owner: string;
  title: string;
  users: string[];
  id: string;
}

const Board: FC<IBoardProps> = ({ owner, title }) => {
  return (
    <div className={cl.container}>
      <h3 className={cl.title}>{title}</h3>
      <h4 className={cl.subtitle}>Created by {owner}</h4>
    </div>
  );
};

export default Board;
