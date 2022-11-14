import React, { FC } from 'react';
import cl from './Column.module.scss';
import { IColumn } from '../../../types/columnType';
import { useDeleteColumnMutation } from '../../../API/columnsCalls';

interface IColumnProps {
  column: IColumn;
  boardId: string;
}

const Column: FC<IColumnProps> = ({ column, boardId }) => {
  const { title, _id: columnId } = column;
  const [deleteColumn, {}] = useDeleteColumnMutation();

  const deleteColumnOnClick = () => {
    deleteColumn({ boardId, columnId });
  };
  return (
    <div className={cl.container}>
      <button onClick={deleteColumnOnClick}>Delete Column</button>
      <h2>{title}</h2>
    </div>
  );
};

export default Column;
