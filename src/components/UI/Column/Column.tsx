import React, { FC } from 'react';
import cl from './Column.module.scss';
import { IColumn, ITask } from '../../../types/boardTypes';
import { useDeleteColumnMutation } from '../../../API/columnsCalls';
import { useGetAllTasksQuery, useCreateNewTaskMutation } from '../../../API/tasksCalls';
import Task from '../Task/Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';

interface IColumnProps {
  column: IColumn;
  boardId: string;
}

const Column: FC<IColumnProps> = ({ column, boardId }) => {
  const { title, _id: columnId, order } = column;
  const [deleteColumn, {}] = useDeleteColumnMutation();
  const { data } = useGetAllTasksQuery({ boardId, columnId });
  const [createNewTask, {}] = useCreateNewTaskMutation();

  const deleteColumnOnClick = () => {
    deleteColumn({ boardId, columnId });
  };

  const createNewTaskOnClick = () => {
    const body = {
      title: Date.now(),
      order: (data as []).length,
      description: 'string',
      userId: 0,
      users: ['string'],
    };
    createNewTask({ boardId, columnId, body });
  };
  return (
    <Draggable draggableId={columnId} index={order}>
      {(provided) => (
        <div className={cl.container} {...provided.draggableProps} ref={provided.innerRef}>
          <button onClick={deleteColumnOnClick}>Delete Column</button>
          <button onClick={createNewTaskOnClick}>Create Task</button>
          <h2 {...provided.dragHandleProps}>{title}</h2>
          <Droppable droppableId={columnId} type="task">
            {(provided) => (
              <div
                className={cl.tasksContainer}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data &&
                  [...(data as ITask[])]
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
