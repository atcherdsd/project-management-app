import React from 'react';
import cl from './BoardPage.module.scss';
import { useNavigate } from 'react-router-dom';

const BoardPage = () => {
  const navigate = useNavigate();

  const boardOnClick = () => {
    navigate(`/main`);
  };
  return (
    <div className={cl.container}>
      <h1>Board</h1>
      <button className={cl.button} onClick={boardOnClick}>
        Back to Main
      </button>
    </div>
  );
};

export default BoardPage;
