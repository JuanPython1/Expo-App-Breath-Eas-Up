import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import traduccionEn from "../translations/en/global.json";
import traduccionEs from "../translations/es/global.json";

const resources = {
  "en-US": { translation: traduccionEn },
  "es-CO": { translation: traduccionEs },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    // Obtener el idioma preferido del dispositivo
    const locales = Localization.getLocales();
    savedLanguage = locales[0].languageTag; // Usa el primer idioma de la lista
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: savedLanguage,
    fallbackLng: "es-CO",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
