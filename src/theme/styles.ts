import { TextStyle } from "react-native";
import { color } from "theme/color";
import { radius } from "theme/shape";
import { spacing } from "theme/spacing";

export const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.5,
  shadowRadius: 4,
  elevation: 4,
};

export const inputFieldStyle = {
  backgroundColor: color.inputBackground,
  borderRadius: radius.md,
  paddingHorizontal: spacing.sm,
  color: color.white,
  height: 33,
  ...shadowStyle,
} as TextStyle;
