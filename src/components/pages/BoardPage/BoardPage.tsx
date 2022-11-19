import React from 'react';
import cl from './BoardPage.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  useGetAllColumnsQuery,
  useCreateNewColumnMutation,
  usePatchColumnsSetMutation,
} from '../../../API/columnsCalls';
import { IColumn, ITask } from '../../../types/boardTypes';
import Column from '../../UI/Column/Column';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { usePatchTasksSetMutation } from '../../../API/tasksCalls';
import { getColumnItemsAxios, getBoardColumnsAxios } from '../../../helpers/axiosCalls';
import { BoardSlice } from '../../../store/reducers/BoardReducer';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

const BoardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const boardId = location.pathname.replace('/main/', '');
  const { data } = useGetAllColumnsQuery(boardId);
  const [createNewColumn, {}] = useCreateNewColumnMutation();
  const [patchTasks, {}] = usePatchTasksSetMutation();
  const [patchColumns, {}] = usePatchColumnsSetMutation();
  const { columns } = useAppSelector((state) => state.BoardReducer);
  const { setLocalColumn } = BoardSlice.actions;
  const dispatch = useAppDispatch();

  const backToMainOnClick = () => {
    navigate(`/main`);
  };

  const addColumnOnClick = () => {
    createNewColumn({
      boardId,
      body: { title: `Column ${Date.now()}`, order: (data as []).length },
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      // const columns = await getBoardColumnsAxios(boardId);
      // columns.sort((a, b) => a.order - b.order);
      // const replaceableItem = columns.splice(source.index, 1);
      // columns.splice(destination.index, 0, replaceableItem[0]);
      // const newOrderedColumns = columns.map((item, index) => ({
      //   _id: item._id,
      //   order: index,
      // }));
      // patchColumns(newOrderedColumns);
      return;
    }

    if (destination.droppableId === source.droppableId) {
      const column = [...(columns.get(source.droppableId) as ITask[])];
      column.sort((a, b) => a.order - b.order);
      const replaceableItem = column.splice(source.index, 1);
      column.splice(destination.index, 0, replaceableItem[0]);

      dispatch(
        setLocalColumn([
          source.droppableId,
          column.map((item, index) => {
            const newItem = { ...item };
            newItem.order = index;
            return newItem;
          }),
        ])
      );

      const newOrderedColumn = column.map((item, index) => ({
        _id: item._id,
        order: index,
        columnId: item.columnId,
      }));

      patchTasks(newOrderedColumn);
      return;
    } else if (destination.droppableId !== source.droppableId) {
      const columnSource = [...(columns.get(source.droppableId) as ITask[])];
      const columnDestination = [...(columns.get(destination.droppableId) as ITask[])];
      columnSource.sort((a, b) => a.order - b.order);
      columnDestination.sort((a, b) => a.order - b.order);
      const replaceableItem = columnSource.splice(source.index, 1);
      columnDestination.splice(destination.index, 0, replaceableItem[0]);

      dispatch(
        setLocalColumn([
          source.droppableId,
          columnSource.map((item, index) => {
            const newItem = { ...item };
            newItem.order = index;
            return newItem;
          }),
        ])
      );

      dispatch(
        setLocalColumn([
          destination.droppableId,
          columnDestination.map((item, index) => {
            const newItem = { ...item };
            if (index === destination.index) newItem.columnId = destination.droppableId;
            newItem.order = index;
            return newItem;
          }),
        ])
      );

      const newOrderedColumnSource = columnSource.map((item, index) => ({
        _id: item._id,
        order: index,
        columnId: source.droppableId,
      }));
      const newOrderedColumnDestination = columnDestination.map((item, index) => ({
        _id: item._id,
        order: index,
        columnId: destination.droppableId,
      }));

      patchTasks([...newOrderedColumnSource, ...newOrderedColumnDestination]);
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
      <button className={cl.button} onClick={backToMainOnClick}>
        Back to Main
      </button>
    </DragDropContext>
  );
};

export default BoardPage;
