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
import {
  useSetLocalColumnTasks,
  useSetLocalBoardColumns,
} from '../../../hooks/useSetLocalStateBoards';
import { sortColumnOrBoard, sortColumnsTasks } from '../../../helpers/sortColumnsTasksState';

const BoardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const boardId = location.pathname.replace('/main/', '');
  const { data } = useGetAllColumnsQuery(boardId);
  const [createNewColumn, {}] = useCreateNewColumnMutation();
  const { columnsTasks, boardColumns } = useAppSelector((state) => state.BoardReducer);
  const { setLocalBoardColumns } = BoardSlice.actions;
  const dispatch = useAppDispatch();
  const reorderLocalTasksState = useSetLocalColumnTasks();
  const reorderLocalColumnsState = useSetLocalBoardColumns();

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
      const columns = sortColumnOrBoard(
        boardColumns.get(boardId) as IColumn[],
        source.index,
        destination.index
      ) as IColumn[];

      reorderLocalColumnsState(source.droppableId, columns);

      reorderColumnsCall(columns);

      return;
    }

    if (destination.droppableId === source.droppableId) {
      const column = sortColumnOrBoard(
        columnsTasks.get(source.droppableId) as ITask[],
        source.index,
        destination.index
      ) as ITask[];

      reorderLocalTasksState(source.droppableId, column);

      reorderTasksCall(column, source.droppableId);

      return;
    } else if (destination.droppableId !== source.droppableId) {
      const [columnSource, columnDestination] = sortColumnsTasks(
        columnsTasks.get(source.droppableId) as ITask[],
        columnsTasks.get(destination.droppableId) as ITask[],
        source.index,
        destination.index
      );

      reorderLocalTasksState(
        source.droppableId,
        columnSource,
        destination.droppableId,
        columnDestination
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
