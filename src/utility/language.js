import i18n from 'i18next';
import {LANGS, STORAGE_LANG_KEY} from "../constants";

export const getLanguage = () => {
    let lang = localStorage.getItem(STORAGE_LANG_KEY);
    if (!lang) {
        lang = i18n.resolvedLanguage || LANGS[0] || 'en';
        localStorage.setItem(STORAGE_LANG_KEY, lang);
    }
    if (lang !== i18n.resolvedLanguage) i18n.changeLanguage(lang);
    return lang;
}

export const setLanguage = (lang) => {
    if (i18n) i18n.changeLanguage(lang);
    localStorage.setItem(STORAGE_LANG_KEY, lang);
}

export const lang = getLanguage();