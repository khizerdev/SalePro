// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const localStore = JSON.parse(localStorage.getItem("persist:app"));
const currentLanguage = JSON.parse(localStore.setting).language;
console.log(currentLanguage);

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Total Revenue": "Total Revenue",
        },
      },
      ge: {
        translation: {
          "Total Revenue": "Gesamteinnahmen",
        },
      },
    },
    lng: currentLanguage || "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
