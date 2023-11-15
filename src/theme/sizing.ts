/**
 * Images container size
 */
export const avatar = {
  sm: 42, // 32pt
  md: 58, // 44pt
  lg: 66, // 50pt
  xl: 84, // 63pt
};

export const images = {
  sm: 20,
  md: 40,
  lg: 60,
  xl: 200,
};

/**
 * Icons size
 */
export const icon = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 80,
  xxxxl: 112,
};

export type IconSizeTypes = keyof typeof icon;

export const buttonSize = {
  xxs: 14,
  xs: 16,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 80,
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
