import React, { FC, useEffect, useState } from 'react';
import cl from './Column.module.scss';
import { IColumn, ITask } from '../../../types/boardTypes';
import { useDeleteColumnMutation } from '../../../API/columnsCalls';
import { useGetAllTasksQuery, useCreateNewTaskMutation } from '../../../API/tasksCalls';
import Task from '../Task/Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { BoardSlice } from '../../../store/reducers/BoardReducer';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import ColumnHeader from './ColumnHeader/ColumnHeader';

interface IColumnProps {
  column: IColumn;
  refetchAdd: (key: string, value: () => void) => void;
}

const Column: FC<IColumnProps> = ({ column, refetchAdd }) => {
  const { title, _id: columnId, order, boardId } = column;
  const [deleteColumn, {}] = useDeleteColumnMutation();
  const { data, refetch } = useGetAllTasksQuery({ boardId, columnId });
  const [createNewTask, {}] = useCreateNewTaskMutation();
  const { setLocalColumnTasks } = BoardSlice.actions;
  const dispatch = useAppDispatch();
  const { columnsTasks } = useAppSelector((state) => state.BoardReducer);
  const [titleStatus, setTitleStatus] = useState<{ status: 'title' | 'input'; value: string }>({
    status: 'title',
    value: title,
  });

  refetchAdd(columnId, refetch);

  useEffect(() => {
    if (data && !columnsTasks.get(columnId)) {
      dispatch(setLocalColumnTasks([columnId, [...(data as ITask[])]]));
    }
  }, [data]);

  const deleteColumnOnClick = () => {
    deleteColumn({ boardId, columnId });
  };

  const createNewTaskOnClick = async () => {
    const body = {
      title: Date.now(),
      order: (data as []).length,
      description: 'string',
      userId: 0,
      users: ['string'],
    };
    const newTask = await createNewTask({ boardId, columnId, body }).unwrap();
    const newColumnTasks = [...(columnsTasks.get(columnId) as ITask[]), newTask];
    dispatch(setLocalColumnTasks([columnId, newColumnTasks as ITask[]]));
  };
  return (
    <Draggable draggableId={columnId} index={order}>
      {(provided) => (
        <div className={cl.container} {...provided.draggableProps} ref={provided.innerRef}>
          <ColumnHeader
            status={titleStatus.status}
            titleStatusValue={titleStatus.value}
            setTitleStatus={setTitleStatus}
            columnId={columnId}
            boardId={boardId}
            order={order}
            deleteColumnOnClick={deleteColumnOnClick}
            createNewTaskOnClick={createNewTaskOnClick}
            dragHandleProps={provided.dragHandleProps}
          />
          <Droppable droppableId={columnId} type="task">
            {(provided) => (
              <div
                className={cl.tasksContainer}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columnsTasks.get(columnId) &&
                  [...(columnsTasks.get(columnId) as ITask[])]
                    .sort((a, b) => a.order - b.order)
                    .map((task, index) => (
                      <Task
                        key={task._id}
                        task={task}
                        boardId={boardId}
                        columnId={columnId}
                        index={index}
                      />
                    ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
