import { useTranslate } from '../../../hooks/useTranslate';
import React from 'react';
import cl from './Benefit.module.scss';
import team from '../../../assets/team-flexibility-150x150.svg';
import medal from '../../../assets/medal-150x150.svg';
import clock from '../../../assets/clock.svg';
import customer from '../../../assets/customer-satisfaction-150x150.svg';

const Benefit: React.FC = (): JSX.Element => {
  const T = useTranslate();

  return (
    <>
      <div className={cl.container}>
        <div className={cl.icon_wrapper}>
          <img className={cl.icon} src={team} alt="Benefits icon"></img>
        </div>
        <div className={cl.content_container}>
          <h3 className={cl.benefit_title}>{T('WelcomePage.descriptBenefitTitle1')}</h3>
          <p className={cl.benefit_content}>{T('WelcomePage.descriptBenefitContent1')}</p>
        </div>
      </div>
      <div className={cl.container}>
        <div className={cl.icon_wrapper}>
          <img className={cl.icon} src={medal} alt="Benefits icon"></img>
        </div>
        <div className={cl.content_container}>
          <h3 className={cl.benefit_title}>{T('WelcomePage.descriptBenefitTitle2')}</h3>
          <p className={cl.benefit_content}>{T('WelcomePage.descriptBenefitContent2')}</p>
        </div>
      </div>
      <div className={cl.container}>
        <div className={cl.icon_wrapper}>
          <img className={cl.icon} src={clock} alt="Benefits icon"></img>
        </div>
        <div className={cl.content_container}>
          <h3 className={cl.benefit_title}>{T('WelcomePage.descriptBenefitTitle3')}</h3>
          <p className={cl.benefit_content}>{T('WelcomePage.descriptBenefitContent3')}</p>
        </div>
      </div>
      <div className={cl.container}>
        <div className={cl.icon_wrapper}>
          <img className={cl.icon} src={customer} alt="Benefits icon"></img>
        </div>
        <div className={cl.content_container}>
          <h3 className={cl.benefit_title}>{T('WelcomePage.descriptBenefitTitle4')}</h3>
          <p className={cl.benefit_content}>{T('WelcomePage.descriptBenefitContent4')}</p>
        </div>
      </div>
    </>
  );
};

export default Benefit;
