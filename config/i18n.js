import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLocale from "../public/locales/en/translation.json";

i18n.use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enLocale,
            },
        },
        lng: "en",
        fallbackLng: "en",
    });

export default i18n;
