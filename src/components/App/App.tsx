import React from 'react';
import cl from './App.module.scss';
import TestComponent from '../TestComponent/TestComponent';

const App = () => {
  return (
    <div className={cl.container}>
      <TestComponent />
    </div>
  );
};

export default App;
