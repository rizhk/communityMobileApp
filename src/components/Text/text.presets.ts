import { TextStyle } from "react-native";
import { color, textSize, typography } from "theme";

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  fontSize: textSize.sm,
};

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: { ...BASE, fontWeight: "bold" } as TextStyle,

  /**
   * Large headers.
   */
  header: { ...BASE, fontSize: textSize.lg, fontWeight: "bold", alignSelf: "center" } as TextStyle,
  button: { ...BASE, fontSize: textSize.md, fontWeight: "bold", alignSelf: "center" } as TextStyle,
  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: { ...BASE, fontSize: 13, color: color.dim } as TextStyle,

  /**
   * A smaller piece of secondary information.
   */
  secondary: { ...BASE, fontSize: 9, color: color.dim } as TextStyle,

  inputLabel: {
    ...BASE,
    fontSize: textSize.md,
    fontWeight: "bold",
    color: color.primary,
    textTransform: "uppercase",
  } as TextStyle,
  fieldError: { ...BASE, fontSize: 9, color: color.error } as TextStyle,
};

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets;
