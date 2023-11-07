import { TouchableOpacityProps, ViewProps } from "react-native";
import { ButtonPresets } from "./button.presets";
import i18n from "i18n-js";
import { TextPresets } from "components/Text/text.presets";

export interface ButtonProps extends TouchableOpacityProps {
  iconPosition?: "left" | "right";
  icon?: React.FunctionComponent<React.SVGProps<SVGAElement>>;
  iconSize?: number;
  preset?: ButtonPresets;
  tx?: i18n.Scope;
  txOptions?: i18n.TranslateOptions;
  text?: string;
  textPreset?: TextPresets;
  style?: ViewProps;
}
