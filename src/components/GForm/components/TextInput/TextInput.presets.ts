import { ViewStyle } from "react-native";
import { inputFieldStyle } from "../styles";
import { color, spacing } from "theme";
import { View } from "react-native-animatable";

const BASE = {
  container: {} as ViewStyle,
  inputField: {
    ...inputFieldStyle,
  } as ViewStyle,
};

export const presets = {
  default: { ...BASE },
  thin: {
    container: {
      ...BASE.container,
      paddingVertical: spacing.xxs,
      paddingHorizontal: spacing.sm,
    } as ViewStyle,
    inputField: {
      ...BASE.inputField,
      height: 35,
      backgroundColor: color.grey800,
      width: "100%",
    } as ViewStyle,
  },
};

export type TextInputPresets = keyof typeof presets;
