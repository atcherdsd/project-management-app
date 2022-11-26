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
}

const Column: FC<IColumnProps> = ({ column }) => {
  const { title, _id: columnId, order, boardId } = column;
  const [deleteColumn, { isLoading: isDeleting }] = useDeleteColumnMutation();
  const { data } = useGetAllTasksQuery({ boardId, columnId });
  const [createNewTask, {}] = useCreateNewTaskMutation();
  const { setLocalColumnTasks } = BoardSlice.actions;
  const dispatch = useAppDispatch();
  const { columnsTasks } = useAppSelector((state) => state.BoardReducer);
  const [titleStatus, setTitleStatus] = useState<{ status: 'title' | 'input'; value: string }>({
    status: 'title',
    value: title,
  });
  useEffect(() => {
    if (data) dispatch(setLocalColumnTasks([columnId, [...(data as ITask[])]]));
  }, [data]);
  //Modal manipulations
  ////////////////////////
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (!isDeleting) {
      setModalOpen(false);
    }
  }, [isDeleting]);
  ///////////////////////////////////////////////////

  const deleteColumnOnClick = () => {
    setModalOpen(true);
  };

  function confirmDeleteColumn(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const target = (e.target as HTMLElement).closest('input');
    const value = target?.value;
    if (value == 'No' || value == 'Нет') {
      setModalOpen(false);
    }
    if (value == 'Yes' || value == 'Да') {
      deleteColumn({ boardId, columnId });
    }
  }

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
            isModalOpen={isModalOpen}
            isDeleting={isDeleting}
            confirmDeleteColumn={confirmDeleteColumn}
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
