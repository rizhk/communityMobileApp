import { TextPresets } from "components/Text/text.presets";
import i18n from "i18n-js";
import { SVGAttributes } from "react";
import { StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";
import { ButtonSizeTypes, ThemeColorType } from "theme";

import { ButtonPresets } from "./button.presets";

export interface ButtonProps extends TouchableOpacityProps {
  // text passed to Text component
  tx?: i18n.Scope;
  txOptions?: i18n.TranslateOptions;
  text?: string;
  textPreset?: TextPresets;
  textStyle?: TextStyle;
  textColor?: ThemeColorType;
  // icon props
  iconPosition?: "left" | "right";
  icon?: React.FunctionComponent<SVGAttributes<SVGElement>>;
  iconScale?: number;
  preset?: ButtonPresets;
  rounded?: boolean;
  // size of rounded button
  size?: ButtonSizeTypes;
  // styles override
  style?: StyleProp<ViewStyle>;
  color?: ThemeColorType;
}
