import React, { FC } from 'react';
import { ITask } from '../../../types/taskType';
import cl from './Task.module.scss';
import { useDeleteTaskMutation } from '../../../API/tasksCalls';

interface ITaskProps {
  task: ITask;
  boardId: string;
  columnId: string;
}

const Task: FC<ITaskProps> = ({ task, boardId, columnId }) => {
  const { title, _id: id } = task;
  const [deleteTask, {}] = useDeleteTaskMutation();

  const deleteTaskOnClick = () => {
    deleteTask({ boardId, columnId, id });
  };

  return (
    <div className={cl.container}>
      <h3>{title}</h3>
      <button onClick={deleteTaskOnClick}>Delete Task</button>
    </div>
  );
};

export default Task;
