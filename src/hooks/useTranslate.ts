import { useState } from 'react';
import { LanguageType } from '../types/languageType';

export const useTranslate = <N>(
  element: { EN: N; RU: N },
  language: LanguageType
): [N, () => void] => {
  const [translate, setTranslate] = useState<N>({} as N);

  const setLanguage = () => {
    const dictionaryLanguage = element[language];
    setTranslate(dictionaryLanguage as N);
  };

  return [translate as N, setLanguage];
};
