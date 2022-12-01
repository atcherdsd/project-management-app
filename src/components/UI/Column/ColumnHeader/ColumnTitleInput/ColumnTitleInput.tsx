import React, { FC, useState } from 'react';
import { useUpdateTitleMutation } from '../../../../../API/columnsCalls';
import cl from './ColumnTitleInput.module.scss';

interface IColumnTitleInputProps {
  title: string;
  callback: (value: string) => void;
  boardId: string;
  columnId: string;
  order: number;
}

const ColumnTitleInput: FC<IColumnTitleInputProps> = ({
  title,
  callback,
  boardId,
  columnId,
  order,
}) => {
  const [inputTitle, setInputTitle] = useState(title);
  const [updateTitle, {}] = useUpdateTitleMutation();
  return (
    <form
      className={cl.container}
      onSubmit={(e) => {
        e.preventDefault();
        callback(inputTitle);
        updateTitle({ body: { title: inputTitle, order }, columnId, boardId });
      }}
    >
      <input
        type="text"
        value={inputTitle}
        onChange={(e) => {
          setInputTitle(e.target.value);
        }}
        autoFocus
      />
      <button type="submit">submit</button>
      <button type="submit" onClick={() => setInputTitle(title)}>
        cancel
      </button>
    </form>
  );
};

export default ColumnTitleInput;