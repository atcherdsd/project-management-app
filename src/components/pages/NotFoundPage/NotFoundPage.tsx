import dictionary from '../../../dictionary';
import { useAppSelector } from '../../../hooks/redux';
import { useTranslate } from '../../../hooks/useTranslate';
import React, { useEffect, useState } from 'react';
import { INotFoundPageLanguage } from '../../../types/dictionaryTypes';
import cl from './NotFoundPage.module.scss';
import { useNavigate } from 'react-router-dom';

const time = 5;

const NotFoundPage: React.FC = (): JSX.Element => {
  const { language } = useAppSelector((state) => state.LanguageReducer);
  const [T, setT] = useTranslate<INotFoundPageLanguage>(dictionary.NotFoundPage, language);
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

  useEffect(() => {
    setT();
  }, [language, setT]);

  return (
    <div className={cl.container}>
      <div className={cl.wrapper}>
        <h1 className={cl.title}>404</h1>
        <p className={cl.declaration}>{T.declaration}</p>
        <div className={cl.exit_message_container}>
          <div className={cl.exit_message}>{T.exitMessage}</div>
          <div className={cl.exit_count}>
            {timeLeft} {T.seconds}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
