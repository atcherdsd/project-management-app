import { useTranslate } from '../../../hooks/useTranslate';
import React, { useEffect, useState } from 'react';
import cl from './NotFoundPage.module.scss';
import { useNavigate } from 'react-router-dom';

const time = 5;

const NotFoundPage: React.FC = (): JSX.Element => {
  const T = useTranslate();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState<number>(time);
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      if (timeLeft === 0) navigate('/');
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [navigate, timeLeft]);

  return (
    <div className={cl.container}>
      <div className={cl.wrapper}>
        <h1 className={cl.title}>404</h1>
        <p className={cl.declaration}>{T('NotFoundPage.declaration')}</p>
        <div className={cl.exit_message_container}>
          <div className={cl.exit_message}>{T('NotFoundPage.exitMessage')}</div>
          <div className={cl.exit_count}>
            {timeLeft} {T('NotFoundPage.seconds')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
