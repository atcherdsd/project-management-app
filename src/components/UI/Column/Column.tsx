import React, { FC } from 'react';
import cl from './Column.module.scss';
import { ITask } from '../../../types/taskType';
import { IColumn } from '../../../types/columnType';
import { useDeleteColumnMutation } from '../../../API/columnsCalls';
import { useGetAllTasksQuery, useCreateNewTaskMutation } from '../../../API/tasksCalls';
import Task from '../Task/Task';

interface IColumnProps {
  column: IColumn;
  boardId: string;
}

const Column: FC<IColumnProps> = ({ column, boardId }) => {
  const { title, _id: columnId } = column;
  const [deleteColumn, {}] = useDeleteColumnMutation();
  const { data } = useGetAllTasksQuery({ boardId, columnId });
  const [createNewTask, {}] = useCreateNewTaskMutation();

  const deleteColumnOnClick = () => {
    deleteColumn({ boardId, columnId });
  };

  const createNewTaskOnClick = () => {
    const body = {
      title: Date.now(),
      order: 0,
      description: 'string',
      userId: 0,
      users: ['string'],
    };
    createNewTask({ boardId, columnId, body });
  };
  return (
    <div className={cl.container}>
      <button onClick={deleteColumnOnClick}>Delete Column</button>
      <button onClick={createNewTaskOnClick}>Create Task</button>
      <h2>{title}</h2>
      <div className={cl.tasksContainer}>
        {data &&
          (data as ITask[]).map((task) => (
            <Task key={task._id} task={task} boardId={boardId} columnId={columnId} />
          ))}
      </div>
    </div>
  );
};

export default Column;
