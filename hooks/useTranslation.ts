import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { useState, useMemo, useCallback } from 'react';
import en from '../locales/en/en';
import ua from '../locales/ua/ua';
import es from '../locales/es/es';

import TranslationInterpolation from '../locales/TranslationInterpolation';

const translations = {
  en: en,
  ua: ua,
  es: es,
};

type TranslationKeys = keyof typeof en;

type InterpolationForKey<K extends TranslationKeys> =
  K extends keyof TranslationInterpolation
    ? TranslationInterpolation[K]
    : Record<string, any>;

export function useTranslation() {
  const deviceLanguage = getLocales()[0]?.languageCode || 'en';

  const [language, setLanguage] = useState(deviceLanguage);

  const i18n = useMemo(() => {
    const i18nInstance = new I18n(translations);
    i18nInstance.locale = language;
    i18nInstance.enableFallback = true;
    return i18nInstance;
  }, [language]);

  const t = useCallback(
    <K extends TranslationKeys>(key: K, obj?: InterpolationForKey<K>) => {
      return i18n.t(key, obj);
    },
    [language]
  );

  const changeLanguage = (newLanguage: 'en' | 'ua' | 'sp') => {
    setLanguage(newLanguage);
    i18n.locale = newLanguage;
  };

  return {
    t,
    language,
    changeLanguage,
  };
}
