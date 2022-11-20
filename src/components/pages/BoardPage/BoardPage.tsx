import React, { useEffect } from 'react';
import cl from './BoardPage.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetAllColumnsQuery, useCreateNewColumnMutation } from '../../../API/columnsCalls';
import { IColumn, ITask } from '../../../types/boardTypes';
import Column from '../../UI/Column/Column';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { BoardSlice } from '../../../store/reducers/BoardReducer';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { reorderTasksCall, reorderColumnsCall } from '../../../helpers/tasksColumnsReorderCalls';

const BoardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const boardId = location.pathname.replace('/main/', '');
  const { data } = useGetAllColumnsQuery(boardId);
  const [createNewColumn, {}] = useCreateNewColumnMutation();
  const { columnsTasks, boardColumns } = useAppSelector((state) => state.BoardReducer);
  const { setLocalColumnTasks, setLocalBoardColumns } = BoardSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) dispatch(setLocalBoardColumns([boardId, [...(data as IColumn[])]]));
  }, [data]);

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
      const columns = [...(boardColumns.get(boardId) as IColumn[])];
      columns.sort((a, b) => a.order - b.order);
      const replaceableItem = columns.splice(source.index, 1);
      columns.splice(destination.index, 0, replaceableItem[0]);

      dispatch(
        setLocalBoardColumns([
          source.droppableId,
          columns.map((column, index) => {
            const newColumn = { ...column };
            newColumn.order = index;
            return newColumn;
          }),
        ])
      );

      reorderColumnsCall(columns);

      return;
    }

    if (destination.droppableId === source.droppableId) {
      const column = [...(columnsTasks.get(source.droppableId) as ITask[])];
      column.sort((a, b) => a.order - b.order);
      const replaceableItem = column.splice(source.index, 1);
      column.splice(destination.index, 0, replaceableItem[0]);

      dispatch(
        setLocalColumnTasks([
          source.droppableId,
          column.map((item, index) => {
            const newItem = { ...item };
            newItem.order = index;
            return newItem;
          }),
        ])
      );

      reorderTasksCall(column, source.droppableId);

      return;
    } else if (destination.droppableId !== source.droppableId) {
      const columnSource = [...(columnsTasks.get(source.droppableId) as ITask[])];
      const columnDestination = [...(columnsTasks.get(destination.droppableId) as ITask[])];
      columnSource.sort((a, b) => a.order - b.order);
      columnDestination.sort((a, b) => a.order - b.order);
      const replaceableItem = columnSource.splice(source.index, 1);
      columnDestination.splice(destination.index, 0, replaceableItem[0]);

      dispatch(
        setLocalColumnTasks([
          source.droppableId,
          columnSource.map((item, index) => {
            const newItem = { ...item };
            newItem.order = index;
            return newItem;
          }),
        ])
      );

      dispatch(
        setLocalColumnTasks([
          destination.droppableId,
          columnDestination.map((item, index) => {
            const newItem = { ...item };
            if (index === destination.index) newItem.columnId = destination.droppableId;
            newItem.order = index;
            return newItem;
          }),
        ])
      );

      reorderTasksCall(
        columnSource,
        source.droppableId,
        columnDestination,
        destination.droppableId
      );

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
              {boardColumns.get(boardId) &&
                [...(boardColumns.get(boardId) as IColumn[])]
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
