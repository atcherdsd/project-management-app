import React from 'react';
import cl from './Authors.module.scss';

const Authors = () => {
  return (
    <div className={cl.container}>
      <a className={cl.author} target="_blank" rel="noreferrer" href="https://github.com/agtugchik">
        agtugchik
      </a>
      <a className={cl.author} target="_blank" rel="noreferrer" href="https://github.com/atcherdsd">
        atcherdsd
      </a>
      <a
        className={cl.author}
        target="_blank"
        rel="noreferrer"
        href="https://github.com/mazeltovik"
      >
        mazeltovik
      </a>
    </div>
  );
};

export default Authors;
