import React from 'react';
import cl from './OurTeam.module.scss';
import { useTranslate } from '../../../../hooks/useTranslate';
import TeamMember from '../../../UI/TeamMember/TeamMember';

const OurTeam: React.FC = (): JSX.Element => {
  const T = useTranslate();

  return (
    <section className={cl.container}>
      <h3 className={cl.title}>{T('WelcomePage.ourTeam')}</h3>
      <div className={cl.content_container}>
        <TeamMember />
      </div>
    </section>
  );
};

export default OurTeam;
