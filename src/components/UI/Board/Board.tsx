import React, { FC, MouseEvent, useState } from 'react';
import cl from './Board.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDeleteBoardMutation } from '../../../API/boardsCalls';
import { useTranslate } from '../../../hooks/useTranslate';
import { Modal } from '../../../components/Modal/modal';
import ConfirmModal from '../../../components/Modal/modals/confirmModal';

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
  //Modal manipulations
  ////////////////////////
  const [isModalOpen, setModalOpen] = useState(false);

  ///////////////////////////////////////////////////
  const boardOnClick = () => {
    navigate(`/main/${id}`);
  };

  const deleteOnClick = (e: MouseEvent) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  function confirmDeleteBoard(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const target = (e.target as HTMLElement).closest('input');
    const value = target?.value;
    if (value == 'No' || value == 'Нет') {
      setModalOpen(false);
    }
    if (value == 'Yes' || value == 'Да') {
      setModalOpen(false);
      deleteBoard(id);
    }
  }

  return (
    <div className={cl.container} onClick={boardOnClick}>
      <h3 className={cl.title}>{title}</h3>
      <h4 className={cl.subtitle}>
        {T('Board.created')} {owner}
      </h4>
      <button className={cl.delete} onClick={(e) => deleteOnClick(e)}>
        {T('Board.delete')}
      </button>
      {isModalOpen && (
        <Modal>
          <ConfirmModal handler={confirmDeleteBoard}></ConfirmModal>
        </Modal>
      )}
    </div>
  );
};

export default Board;
