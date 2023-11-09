import { TextStyle } from "react-native";
import { color, spacing, text, typography } from "theme";

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  fontSize: text.sm,
};

export const presets = {
  default: BASE,
  bold: { ...BASE, fontWeight: "bold" } as TextStyle,

  header: { ...BASE, fontSize: text.lg, fontWeight: "bold", alignSelf: "center" } as TextStyle,
  button: { ...BASE, fontSize: text.md, fontWeight: "bold", alignSelf: "center" } as TextStyle,

  fieldLabel: { ...BASE, fontSize: 13, color: color.dim } as TextStyle,

  secondary: { ...BASE, fontSize: 9, color: color.dim } as TextStyle,

  inputLabel: {
    ...BASE,
    fontSize: text.md,
    fontWeight: "bold",
    color: color.primary,
    textTransform: "uppercase",
  } as TextStyle,
  fieldError: { ...BASE, fontSize: 9, color: color.error } as TextStyle,

  tabHeader: {
    textAlign: "center",
    fontSize: text.sm,
    color: color.grey200,
    padding: spacing.md,
  } as TextStyle,

  tabHeaderActive: {
    textAlign: "center",
    fontSize: text.sm,
    color: color.white,
    padding: spacing.md,
  } as TextStyle,
};

export type TextPresets = keyof typeof presets;
