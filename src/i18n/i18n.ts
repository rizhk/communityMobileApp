import * as Localization from "expo-localization";
import i18n from "i18n-js";

import de from "./de.json";
import en from "./en.json";
import fr from "./fr.json";
import it from "./it.json";

i18n.fallbacks = true;
i18n.translations = { en, fr, de, it };

i18n.locale = Localization.locale || "fr";

//add fallback to french for missing translations
i18n.missingTranslation = function (scope) {
  return i18n.t(scope, { locale: "fr" });
};

i18n.defaultSeparator = ".";

export { i18n };
