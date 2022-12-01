import React, { FC, MouseEvent } from 'react';
import cl from './Board.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDeleteBoardMutation } from '../../../API/boardsCalls';
import { useTranslate } from '../../../hooks/useTranslate';

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
  const [deleteBoard, {}] = useDeleteBoardMutation();
  const T = useTranslate();

  const boardOnClick = () => {
    navigate(`/main/${id}`);
  };

  const deleteOnClick = (e: MouseEvent) => {
    e.stopPropagation();
    deleteBoard(id);
  };

  return (
    <div className={cl.container} onClick={boardOnClick}>
      <h3 className={cl.title}>{title}</h3>
      <h4 className={cl.subtitle}>
        {T('Board.created')} {owner}
      </h4>
      <button className={cl.delete} onClick={(e) => deleteOnClick(e)}>
        {T('Board.delete')}
      </button>
    </div>
  );
};

export default Board;
