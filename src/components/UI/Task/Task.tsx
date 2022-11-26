import React, { FC, useEffect, useState } from 'react';
import { ITask } from '../../../types/boardTypes';
import cl from './Task.module.scss';
import { useDeleteTaskMutation } from '../../../API/tasksCalls';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslate } from '../../../hooks/useTranslate';
import { Modal } from '../../Modal/modal';
import ConfirmModal from '../../Modal/modals/confirmModal';

interface ITaskProps {
  task: ITask;
  boardId: string;
  columnId: string;
  index: number;
}

const Task: FC<ITaskProps> = ({ task, boardId, columnId, index }) => {
  const { title, _id: id } = task;
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const T = useTranslate();
  //Modal manipulations
  ////////////////////////
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (!isLoading) {
      setModalOpen(false);
    }
  }, [isLoading]);
  ///////////////////////////////////////////////////
  const deleteTaskOnClick = () => {
    setModalOpen(true);
    // deleteTask({ boardId, columnId, id });
  };

  function confirmDeleteTask(e: React.MouseEvent<HTMLElement>) {
    const target = (e.target as HTMLElement).closest('input');
    const value = target?.value;
    if (value == 'No' || value == 'Нет') {
      setModalOpen(false);
    }
    if (value == 'Yes' || value == 'Да') {
      deleteTask({ boardId, columnId, id });
    }
  }

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
          {isModalOpen && (
            <Modal>
              <ConfirmModal handler={confirmDeleteTask} isLoading={isLoading}></ConfirmModal>
            </Modal>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
