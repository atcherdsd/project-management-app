import React from 'react';
import cl from './BoardPage.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetAllColumnsQuery, useCreateNewColumnMutation } from '../../../API/columnsCalls';
import { IColumn } from '../../../types/columnType';
import Column from '../../UI/Column/Column';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { usePatchTasksSetMutation } from '../../../API/tasksCalls';
import getColumnItemsAxios from '../../../helpers/getColumnnItemsAxios';

const BoardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const boardId = location.pathname.replace('/main/', '');
  const { data } = useGetAllColumnsQuery(boardId);
  const [createNewColumn, {}] = useCreateNewColumnMutation();
  const [patchTasks, {}] = usePatchTasksSetMutation();

  const boardOnClick = () => {
    navigate(`/main`);
  };

  const addColumnOnClick = () => {
    createNewColumn({
      boardId,
      body: { title: `Column ${Date.now()}`, order: (data as []).length },
    });
  };

  const onDragStart = () => {};
  const onDragUpdate = () => {};
  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    // const patchedTasks = [];

    // const sourceItems = await getColumnItemsAxios(boardId, source.droppableId);
    // const destinationItems = await getColumnItemsAxios(boardId, destination.droppableId);

    // sourceItems.map((item) => {
    //   if (item._id !== draggableId) {
    //     if (item.order > source.index)
    //       patchedTasks.push({ _id: item._id, order: item.order - 1, columnId: item.columnId });
    //     else if (item.order < source.index)
    //       patchedTasks.push({ _id: item._id, order: item.order, columnId: item.columnId });
    //   }
    // });

    patchTasks([{ _id: draggableId, order: destination.index, columnId: destination.droppableId }]);

    // console.log(sourceItems);
    // console.log(destinationItems);
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
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
    </DragDropContext>
  );
};

export default BoardPage;
