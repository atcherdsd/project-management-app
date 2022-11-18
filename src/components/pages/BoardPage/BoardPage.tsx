import React from 'react';
import cl from './BoardPage.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetAllColumnsQuery, useCreateNewColumnMutation } from '../../../API/columnsCalls';
import { IColumn } from '../../../types/columnType';
import Column from '../../UI/Column/Column';
import { DragDropContext, DragUpdate, DropResult } from 'react-beautiful-dnd';
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
  const onDragUpdate = async (result: DragUpdate) => {};
  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (destination.droppableId === source.droppableId) {
      const column = await getColumnItemsAxios(boardId, source.droppableId);
      column.sort((a, b) => a.order - b.order);
      const replaceableItem = column.splice(source.index, 1);
      column.splice(destination.index, 0, replaceableItem[0]);

      const newOrderedColumn = column.map((item, index) => ({
        _id: item._id,
        order: index,
        columnId: item.columnId,
      }));

      patchTasks(newOrderedColumn);
      return;
    } else if (destination.droppableId !== source.droppableId) {
      const columns = await Promise.all([
        getColumnItemsAxios(boardId, source.droppableId),
        getColumnItemsAxios(boardId, destination.droppableId),
      ]);
      const columnSource = columns[0];
      const columnDestination = columns[1];
      columnSource.sort((a, b) => a.order - b.order);
      columnDestination.sort((a, b) => a.order - b.order);
      const replaceableItem = columnSource.splice(source.index, 1);
      replaceableItem[0].columnId = destination.droppableId;
      columnDestination.splice(destination.index, 0, replaceableItem[0]);

      const newOrderedColumnSource = columnSource.map((item, index) => ({
        _id: item._id,
        order: index,
        columnId: item.columnId,
      }));
      const newOrderedColumnDestination = columnDestination.map((item, index) => ({
        _id: item._id,
        order: index,
        columnId: item.columnId,
      }));

      patchTasks([...newOrderedColumnSource, ...newOrderedColumnDestination]);
      return;
    }
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
