import { StyleProp, TouchableOpacityProps, ViewProps } from "react-native";
import { ButtonPresets } from "./button.presets";
import i18n from "i18n-js";
import { TextPresets } from "components/Text/text.presets";
import { SVGAttributes } from "react";
import { ButtonSizeTypes } from "theme";

export interface ButtonProps extends TouchableOpacityProps {
  iconPosition?: "left" | "right";
  icon?: React.FunctionComponent<SVGAttributes<SVGElement>>;
  preset?: ButtonPresets;
  tx?: i18n.Scope;
  txOptions?: i18n.TranslateOptions;
  text?: string;
  textPreset?: TextPresets;
  style?: StyleProp<ViewProps>;
  rounded?: boolean;
  // size of rounded button
  size?: ButtonSizeTypes;
}
