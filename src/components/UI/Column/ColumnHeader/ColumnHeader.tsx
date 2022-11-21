import React, { FC, SetStateAction } from 'react';
import ColumnTitleText from './ColumnTitleText/ColumnTitleText';
import ColumnTitleInput from './ColumnTitleInput/ColumnTitleInput';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

interface IColumnHeaderProps {
  status: 'title' | 'input';
  titleStatusValue: string;
  setTitleStatus: (
    value: React.SetStateAction<{
      status: 'title' | 'input';
      value: string;
    }>
  ) => void;
  columnId: string;
  boardId: string;
  order: number;
  deleteColumnOnClick: () => void;
  createNewTaskOnClick: () => void;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
}

const ColumnHeader: FC<IColumnHeaderProps> = ({
  status,
  titleStatusValue,
  setTitleStatus,
  columnId,
  boardId,
  order,
  deleteColumnOnClick,
  createNewTaskOnClick,
  dragHandleProps,
}) => {
  return (
    <div {...dragHandleProps}>
      {status === 'title' ? (
        <ColumnTitleText
          title={titleStatusValue}
          callback={() => setTitleStatus({ status: 'input', value: titleStatusValue })}
        />
      ) : (
        <ColumnTitleInput
          title={titleStatusValue}
          callback={(value: string) => setTitleStatus({ status: 'title', value })}
          columnId={columnId}
          boardId={boardId}
          order={order}
        />
      )}
      <button onClick={deleteColumnOnClick}>Delete Column</button>
      <button onClick={createNewTaskOnClick}>Create Task</button>
    </div>
  );
};

export default ColumnHeader;
