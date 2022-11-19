import React from 'react';
import cl from './BoardPage.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  useGetAllColumnsQuery,
  useCreateNewColumnMutation,
  usePatchColumnsSetMutation,
} from '../../../API/columnsCalls';
import { IColumn } from '../../../types/boardTypes';
import Column from '../../UI/Column/Column';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { usePatchTasksSetMutation } from '../../../API/tasksCalls';
import { getColumnItemsAxios, getBoardColumnsAxios } from '../../../helpers/axiosCalls';

const BoardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const boardId = location.pathname.replace('/main/', '');
  const { data } = useGetAllColumnsQuery(boardId);
  const [createNewColumn, {}] = useCreateNewColumnMutation();
  const [patchTasks, {}] = usePatchTasksSetMutation();
  const [patchColumns, {}] = usePatchColumnsSetMutation();

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
  const onDragUpdate = async () => {};
  const onDragEnd = async (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      const columns = await getBoardColumnsAxios(boardId);
      columns.sort((a, b) => a.order - b.order);
      const replaceableItem = columns.splice(source.index, 1);
      columns.splice(destination.index, 0, replaceableItem[0]);
      const newOrderedColumns = columns.map((item, index) => ({
        _id: item._id,
        order: index,
      }));
      patchColumns(newOrderedColumns);
      return;
    }

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
        <Droppable droppableId={boardId} direction="horizontal" type="column">
          {(provided) => (
            <div
              className={cl.columnsContainer}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data &&
                [...(data as IColumn[])]
                  .sort((a, b) => a.order - b.order)
                  .map((column) => <Column key={column._id} column={column} boardId={boardId} />)}
              {provided.placeholder}
              <button onClick={addColumnOnClick}>Add Column</button>
            </div>
          )}
        </Droppable>
      </div>
      <button className={cl.button} onClick={boardOnClick}>
        Back to Main
      </button>
    </DragDropContext>
  );
};

export default BoardPage;
