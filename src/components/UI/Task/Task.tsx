import React, { FC } from 'react';
import { ITask } from '../../../types/taskType';
import cl from './Task.module.scss';
import { useDeleteTaskMutation } from '../../../API/tasksCalls';
import { useDrag } from 'react-dnd';
import { DnDTypes } from '../../../types/dragAndDropTypes';

interface ITaskProps {
  task: ITask;
  boardId: string;
  columnId: string;
}

const Task: FC<ITaskProps> = ({ task, boardId, columnId }) => {
  const { title, _id: id } = task;
  const [deleteTask, {}] = useDeleteTaskMutation();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DnDTypes.Task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const deleteTaskOnClick = () => {
    deleteTask({ boardId, columnId, id });
  };

  return (
    <div className={cl.container} ref={drag}>
      <h3>{title}</h3>
      <button onClick={deleteTaskOnClick}>Delete Task</button>
    </div>
  );
};

export default Task;
