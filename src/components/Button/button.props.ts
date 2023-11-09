import { StyleProp, TouchableOpacityProps, ViewProps } from "react-native";
import { ButtonPresets } from "./button.presets";
import i18n from "i18n-js";
import { TextPresets } from "components/Text/text.presets";
import { SVGAttributes } from "react";
import { ButtonSizeTypes, ThemeColorType } from "theme";

export interface ButtonProps extends TouchableOpacityProps {
  // text passed to Text component
  tx?: i18n.Scope;
  txOptions?: i18n.TranslateOptions;
  text?: string;
  textPreset?: TextPresets;
  // icon props
  iconPosition?: "left" | "right";
  icon?: React.FunctionComponent<SVGAttributes<SVGElement>>;
  preset?: ButtonPresets;
  rounded?: boolean;
  // size of rounded button
  size?: ButtonSizeTypes;
  // styles override
  style?: StyleProp<ViewProps>;
  color?: ThemeColorType;
}
