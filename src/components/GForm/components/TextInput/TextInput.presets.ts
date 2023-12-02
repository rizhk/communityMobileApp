import { ViewStyle } from "react-native";
import { View } from "react-native-animatable";
import { color, spacing } from "theme";

import { inputFieldStyle } from "../styles";

const BASE = {
  container: {} as ViewStyle,
  inputField: {
    ...inputFieldStyle,
    padding: spacing.xs,
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
      shadowColor: color.black,
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.8,
      elevation: 5,
    } as ViewStyle,
  },
};

export type TextInputPresets = keyof typeof presets;
