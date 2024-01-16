/**
 * Images container size
 */
export const avatar = {
  sm: 42, // 32pt
  md: 58, // 44pt
  lg: 66, // 50pt
  xl: 84, // 63pt
};

export const SIZE = {
  // sm: 20,
  // md: 40,
  // lg: 60,
  // xl: 200,
  xxs: 6,
  xs: 8,
  sm: 10,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  xxxxl: 80,
  xxxxxl: 112,
};

export type SizeTypes = keyof typeof SIZE;

export const IMAGE_SIZE = {
  // sm: 20,
  // md: 40,
  // lg: 60,
  // xl: 200,
  xxxs: 16,
  xxs: 24,
  xs: 36,
  sm: 48,
  md: 60,
  lg: 72,
  xl: 84,
  xxl: 96,
  xxxl: 108,
  xxxxl: 120,
};

export type ImagesSizeTypes = keyof typeof IMAGE_SIZE;

export const icon = {
  xxs: 6,
  xs: 8,
  sm: 10,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  xxxxl: 80,
  xxxxxl: 112,
};

export type IconSizeTypes = keyof typeof icon;

export const buttonSize = {
  xxs: 8,
  xs: 16,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
  xxl: 64,
};

export type ButtonSizeTypes = keyof typeof buttonSize;
/**
 * Text size
 */
export const text = {
  xxs: 12, // 9pt
  xs: 14, // 10pt
  sm: 16, // 12pt
  md: 20, // 15pt
  lg: 24, // 20pt
  xl: 32, // 30pt
  xxl: 66, // 50pt
};

export type TextSizeTypes = keyof typeof text;

export const letterSpacing = {
  sm: 2,
  md: 5,
  lg: 10,
};
