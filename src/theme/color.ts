import { palette } from "./palette";

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: "rgba(0, 0, 0, 0)",

  background: palette.pelopsGrey900,
  backgroundLight: palette.pelopsGrey800,
  primary: palette.pelopsRed,
  primaryLight: palette.pelopsLightRed,
  secondary: palette.pelopsOrange,
  primaryDark: palette.pelopsDarkRed,

  line: palette.offWhite,
  text: palette.white,

  grey100: palette.pelopsGrey100,
  grey200: palette.pelopsGrey200,
  grey300: palette.pelopsGrey300,
  grey400: palette.pelopsGrey400,
  grey500: palette.pelopsGrey500,
  grey600: palette.pelopsGrey600,
  grey700: palette.pelopsGrey700,
  grey800: palette.pelopsGrey800,
  grey900: palette.pelopsGrey900,

  white: palette.pelopsWhite,
  black: palette.pelopsGrey900,

  /**
   * Secondary information.
   */
  dim: palette.pelopsGrey200,
  /**
   * Error messages and icons.
   */
  error: palette.angry,

  /**
   * Storybook background for Text stories, or any stories where
   * the text color is color.text, which is white by default, and does not show
   * in Stories against the default white background
   */
  storybookDarkBg: palette.black,

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: palette.black,
  /**
   * The main font color.
   */
  headercolor: palette.whitetext,
};

export type ThemeColorType = keyof typeof color;
