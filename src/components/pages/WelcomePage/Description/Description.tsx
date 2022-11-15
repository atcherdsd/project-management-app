import dictionary from '../../../../dictionary';
import { useAppSelector } from '../../../../hooks/redux';
import { useTranslate } from '../../../../hooks/useTranslate';
import React, { useMemo } from 'react';
import { IWelcomePageLanguage } from 'types/dictionaryTypes';
import cl from './Description.module.scss';
import Benefit from '../../../../components/UI/Benefit/Benefit';

const Description: React.FC = (): JSX.Element => {
  const { language } = useAppSelector((state) => state.LanguageReducer);
  const [T, setT] = useTranslate<IWelcomePageLanguage>(dictionary.WelcomePage, language);

  useMemo(() => {
    setT();
  }, [language]);

  return (
    <section className={cl.container}>
      <h4 className={cl.subtitle}>{T.descriptSubtitle}</h4>
      <h3 className={cl.declaration_title}>{T.descriptDeclarationTitle}</h3>
      <p className={cl.declaration_content}>{T.descriptDeclarationContent}</p>
      <div className={cl.benefits_container}>
        <hr className={cl.line} />
        <h2 className={cl.benefits_title}>{T.descriptBenefitsTitle}</h2>
        <div className={cl.benefits_items_container}>
          <Benefit />
        </div>
        <hr className={cl.line} />
      </div>
    </section>
  );
};

export default Description;
