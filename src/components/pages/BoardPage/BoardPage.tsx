import React, { useEffect } from 'react';
import cl from './BoardPage.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetAllColumnsQuery, useCreateNewColumnMutation } from '../../../API/columnsCalls';
import { IBoard, IColumn, ITask } from '../../../types/boardTypes';
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
import { useGetBoardQuery } from '../../../API/boardsCalls';
import { useTranslate } from '../../../hooks/useTranslate';

const BoardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const boardId = location.pathname.replace('/main/', '');
  const { data, isLoading: isLoadingData, refetch } = useGetAllColumnsQuery(boardId);
  const { data: boardProps, isLoading: isLoadingBoardProps } = useGetBoardQuery(boardId);
  const [createNewColumn, {}] = useCreateNewColumnMutation();
  const { columnsTasks, boardColumns } = useAppSelector((state) => state.BoardReducer);
  const { setLocalBoardColumns } = BoardSlice.actions;
  const dispatch = useAppDispatch();
  const reorderLocalTasksState = useSetLocalColumnTasks();
  const reorderLocalColumnsState = useSetLocalBoardColumns();
  const T = useTranslate();
  const refetchColumns: Map<string, () => void> = new Map();

  const refetchAdd = (key: string, value: () => void) => {
    refetchColumns.set(key, value);
  };

  useEffect(() => {
    if (data && !(boardColumns.get(boardId)?.length === [...(data as IColumn[])].length))
      dispatch(setLocalBoardColumns([boardId, [...(data as IColumn[])]]));
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

      reorderColumnsCall(columns, refetch);

      return;
    }

    if (destination.droppableId === source.droppableId) {
      const column = sortColumnOrBoard(
        columnsTasks.get(source.droppableId) as ITask[],
        source.index,
        destination.index
      ) as ITask[];

      reorderLocalTasksState(source.droppableId, column);

      reorderTasksCall(
        column,
        source.droppableId,
        refetchColumns.get(source.droppableId) as () => void
      );

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
        refetchColumns.get(source.droppableId) as () => void,
        columnDestination,
        destination.droppableId,
        refetchColumns.get(destination.droppableId) as () => void
      );

      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isLoadingData || isLoadingBoardProps ? (
        <h2 style={{ margin: 'auto' }}>Loading...</h2>
      ) : boardColumns.get(boardId) ? (
        <div className={cl.container}>
          <h1 className={cl.title}>
            {T('BoardPage.board')} {boardProps && (boardProps as IBoard).title}
          </h1>
          <Droppable droppableId={boardId} direction="horizontal" type="column">
            {(provided) => (
              <div
                className={cl.columnsContainer}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {[...(boardColumns.get(boardId) as IColumn[])]
                  .sort((a, b) => a.order - b.order)
                  .map((column) => (
                    <Column refetchAdd={refetchAdd} key={column._id} column={column} />
                  ))}
                {provided.placeholder}
                <button onClick={addColumnOnClick}>{T('BoardPage.addColumn')}</button>
              </div>
            )}
          </Droppable>
          <button className={cl.button} onClick={backToMainOnClick}>
            {T('BoardPage.back')}
          </button>
        </div>
      ) : (
        <h2>Error during fetching</h2>
      )}
    </DragDropContext>
  );
};

export default BoardPage;
