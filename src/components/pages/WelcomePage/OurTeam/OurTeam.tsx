import React, { useMemo } from 'react';
import cl from './OurTeam.module.scss';
import { useAppSelector } from '../../../../hooks/redux';
import dictionary from '../../../../dictionary/index';
import { useTranslate } from '../../../../hooks/useTranslate';
import { IWelcomePageLanguage } from 'types/dictionaryTypes';
import TeamMember from '../../../UI/TeamMember/TeamMember';

const OurTeam: React.FC = (): JSX.Element => {
  const { language } = useAppSelector((state) => state.LanguageReducer);
  const [T, setT] = useTranslate<IWelcomePageLanguage>(dictionary.WelcomePage, language);

  useMemo(() => {
    setT();
  }, [language]);

  return (
    <section className={cl.container}>
      <h3 className={cl.title}>{T.ourTeam}</h3>
      <div className={cl.content_container}>
        <TeamMember />
      </div>
    </section>
  );
};

export default OurTeam;
