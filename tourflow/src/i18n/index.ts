import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../../public/locales/en.json';
import esTranslations from '../../public/locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      es: {
        translation: esTranslations,
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;