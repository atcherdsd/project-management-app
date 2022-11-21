import dictionary from '../../../../dictionary';
import { useAppSelector } from '../../../../hooks/redux';
import { useTranslate } from '../../../../hooks/useTranslate';
import React, { useEffect } from 'react';
import { IWelcomePageLanguage } from 'types/dictionaryTypes';
import cl from './Title.module.scss';

const Title: React.FC = (): JSX.Element => {
  const { language } = useAppSelector((state) => state.LanguageReducer);
  const [T, setT] = useTranslate<IWelcomePageLanguage>(dictionary.WelcomePage, language);

  useEffect(() => {
    setT();
  }, [language, setT]);

  return (
    <div className={cl.wrapper}>
      <div className={cl.container}>
        <h1 className={cl.title}>OneTeam</h1>
        <div className={cl.tagline}>{T.titleTagline}</div>
        <div className={cl.proposal}>{T.titleProposal1}</div>
        <div className={cl.proposal}>{T.titleProposal2}</div>
      </div>
    </div>
  );
};

export default Title;
