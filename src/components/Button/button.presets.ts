import { ViewStyle } from "react-native";
import { ThemeColorType, color as themeColor, radius, spacing } from "theme";

const BASE = (color: ThemeColorType) => {
  return {
    borderRadius: radius.xxl,
    padding: spacing.md,
    backgroundColor: themeColor[color],
    gap: spacing.xs,
    marginVertical: spacing.xs,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  };
};

export const presets = {
  default: (color: ThemeColorType) => {
    return BASE(color) as ViewStyle;
  },
  outlined: (color: ThemeColorType) => {
    return {
      ...BASE(color),
      backgroundColor: themeColor.transparent,
      borderWidth: 2,
      borderColor: themeColor[color],
    } as ViewStyle;
  },
  plainText: (color: ThemeColorType) => {
    return {
      ...BASE(color),
      backgroundColor: themeColor.transparent,
      borderWidth: 0,
      borderColor: themeColor.transparent,
      marginVertical: 0,
      padding: 0,
    } as ViewStyle;
  },
  small: (color: ThemeColorType) => {
    return {
      ...BASE(color),
      height: 35,
      padding: 0,
      paddingHorizontal: spacing.sm,
    } as ViewStyle;
  },
};

export type ButtonPresets = keyof typeof presets;
