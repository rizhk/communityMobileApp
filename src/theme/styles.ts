import { ViewStyle } from "react-native";
import { color } from "./color";
import { radius } from "./shape";
import { spacing } from "./spacing";

export const inputFieldStyle = {
  backgroundColor: color.inputBackground,
  borderRadius: radius.md,
  padding: spacing.sm,
  color: color.white,
} as ViewStyle;
