import i18n from "i18n-js";
import { StyleProp, TextProps as TextProperties, TextStyle } from "react-native";
import { TextSizeTypes, ThemeColorType } from "theme";

import { TextPresets } from "./text.presets";

export interface TextProps extends TextProperties {
  children?: React.ReactNode;
  tx?: i18n.Scope;
  txOptions?: i18n.TranslateOptions;
  text?: string;
  style?: StyleProp<TextStyle>;
  preset?: TextPresets;
  //thoses props will override preset
  color?: ThemeColorType;
  size?: TextSizeTypes | number;
}
