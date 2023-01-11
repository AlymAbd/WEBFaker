import CZ from './locales/cz.json'
import EN from './locales/en.json'
import RU from './locales/ru.json'
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import Cookies from 'universal-cookie'

const cookies = new Cookies()


export default i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: EN
      },
      cz: {
        translation: CZ
      },
      ru: {
        translation: RU
      },
    },
    lng: cookies.get('lang'),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });
