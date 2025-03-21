import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resources } from '@app/assets/locales';

i18next.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  resources,
  interpolation: {
    escapeValue: false,
  },
});
