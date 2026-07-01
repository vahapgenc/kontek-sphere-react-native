// i18next initialization for the app. Swedish-first, English fallback.
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';
import { homeEn, homeSv } from '../screens/home/i18n';
import { detailEn, detailSv } from '../screens/home/detail.i18n';
import { profileEn, profileSv } from '../screens/profile/i18n';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'sv',
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    returnNull: false,
  });

  // Per-screen namespaces (kept co-located with their screens).
  i18n.addResourceBundle('en', 'home', homeEn);
  i18n.addResourceBundle('sv', 'home', homeSv);
  i18n.addResourceBundle('en', 'detail', detailEn);
  i18n.addResourceBundle('sv', 'detail', detailSv);
  i18n.addResourceBundle('en', 'profile', profileEn);
  i18n.addResourceBundle('sv', 'profile', profileSv);
}

export default i18n;
