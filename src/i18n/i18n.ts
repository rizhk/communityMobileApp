import * as Localization from "expo-localization";
import i18n from "i18n-js";
import en from "./en.json";
import fr from "./fr.json";
import de from "./de.json";
import it from "./it.json";

i18n.fallbacks = true;
i18n.translations = { en, fr, de, it };

i18n.locale = Localization.locale || "en";

i18n.defaultSeparator = ".";
