import React, { FC } from 'react';
import { ITask } from '../../../types/boardTypes';
import cl from './Task.module.scss';
import { useDeleteTaskMutation } from '../../../API/tasksCalls';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslate } from '../../../hooks/useTranslate';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { BoardSlice } from '../../../store/reducers/BoardReducer';

interface ITaskProps {
  task: ITask;
  boardId: string;
  columnId: string;
  index: number;
}

const Task: FC<ITaskProps> = ({ task, boardId, columnId, index }) => {
  const { title, _id: id } = task;
  const [deleteTask, {}] = useDeleteTaskMutation();
  const T = useTranslate();
  const { columnsTasks } = useAppSelector((state) => state.BoardReducer);
  const dispatch = useAppDispatch();
  const { setLocalColumnTasks } = BoardSlice.actions;

  const deleteTaskOnClick = () => {
    deleteTask({ boardId, columnId, id });
    const newColumnTasks = columnsTasks.get(columnId)?.filter((task) => task._id !== id);
    dispatch(setLocalColumnTasks([columnId, newColumnTasks as ITask[]]));
    console.log(columnsTasks.get(columnId));
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={cl.container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h3>{title}</h3>
          <button onClick={deleteTaskOnClick}>{T('Task.deleteTask')}</button>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
