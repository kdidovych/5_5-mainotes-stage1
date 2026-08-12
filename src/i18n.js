import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import {LANGS, STORAGE_LANG_KEY} from "./constants/index.js";

let lang = localStorage.getItem(STORAGE_LANG_KEY);
if (!lang) {
    lang = LANGS[0] || 'en';
    localStorage.setItem(STORAGE_LANG_KEY, lang);
}

i18n
    .use(HttpBackend) // Dynamically loads translations from public/locales
    .use(initReactI18next) // Passes i18n down to react-i18next
    .init({
        fallbackLng: lang,
        debug: false,
        interpolation: {
            escapeValue: false, // React already safeguards against XSS
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        }
    });

export default i18n;