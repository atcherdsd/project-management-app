import React from 'react';
import cl from './BoardPage.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetAllColumnsQuery, useCreateNewColumnMutation } from '../../../API/columnsCalls';
import { IColumn } from '../../../types/columnType';
import Column from '../../UI/Column/Column';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const BoardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const boardId = location.pathname.replace('/main/', '');
  const { data } = useGetAllColumnsQuery(boardId);
  const [createNewColumn, {}] = useCreateNewColumnMutation();

  const boardOnClick = () => {
    navigate(`/main`);
  };

  const addColumnOnClick = () => {
    createNewColumn({
      boardId,
      body: { title: `Column ${Date.now()}`, order: (data as []).length },
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={cl.container}>
        <h1 className={cl.title}>Board</h1>
        <div className={cl.columnsContainer}>
          {data &&
            (data as IColumn[]).map((column) => (
              <Column key={column._id} column={column} boardId={boardId} />
            ))}
          <button onClick={addColumnOnClick}>Add Column</button>
        </div>
        <button className={cl.button} onClick={boardOnClick}>
          Back to Main
        </button>
      </div>
    </DndProvider>
  );
};

export default BoardPage;
