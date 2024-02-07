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

  background: palette.communityPrimary400,
  backgroundLight: palette.communityPrimary100,
  backgroundCard: palette.communityPrimary200,
  primary: palette.communityPrimary,
  primaryLight: palette.communityPrimary200,
  secondary: palette.communityOrange,
  tertiary: palette.communityGreen,
  primaryDark: palette.communityPrimary700,

  line: palette.communityPrimary200,
  text: palette.black,
  placeholder: palette.communityGrey100,

  grey100: palette.communityGrey100,
  grey200: palette.communityGrey200,
  grey300: palette.communityGrey300,
  grey400: palette.communityGrey400,
  grey500: palette.communityGrey500,
  grey600: palette.communityGrey600,
  grey700: palette.communityGrey700,
  grey800: palette.communityGrey800,
  grey900: palette.communityGrey900,

  white: palette.communityWhite,
  black: palette.black,

  inputBackground: palette.communityGrey600,
  /**
   * Secondary information.
   */
  dim: palette.communityGrey200,
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
  test: "#ff69b450",
};

export type ThemeColorType = keyof typeof color;
