import { TextStyle, ViewStyle } from "react-native";
import { ThemeColorType, color as themeColor } from "theme/color";
import { radius } from "theme/shape";
import { spacing } from "theme/spacing";

export const shadowFocus = (color: ThemeColorType = "primary") => {
  return {
    shadowColor: themeColor[color],
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 20,
  } as ViewStyle;
};

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
  backgroundColor: themeColor.inputBackground,
  borderRadius: radius.xs,
  paddingHorizontal: spacing.sm,
  color: themeColor.white,
  height: 33,
  ...shadowStyle,
} as TextStyle;
