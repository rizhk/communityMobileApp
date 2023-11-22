import { ViewStyle } from "react-native";
import { color } from "theme/color";
import { radius } from "theme/shape";
import { spacing } from "theme/spacing";

export const inputFieldStyle = {
  backgroundColor: color.inputBackground,
  borderRadius: radius.md,
  paddingHorizontal: spacing.sm,
  color: color.white,
} as ViewStyle;
