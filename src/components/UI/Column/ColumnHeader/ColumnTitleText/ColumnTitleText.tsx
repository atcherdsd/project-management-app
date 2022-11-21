import React, { FC } from 'react';

interface IColumnTitleTextProps {
  title: string;
  callback: () => void;
}

const ColumnTitleText: FC<IColumnTitleTextProps> = ({ title, callback }) => {
  return <h2 onClick={callback}>{title}</h2>;
};

export default ColumnTitleText;
