export const radius = {
  none: 0,
  xxxs: 2, // 3pt
  xxs: 4, // 3pt
  xs: 6, // 3pt
  sm: 8, // 6pt
  md: 11, // 8pt
  lg: 16, // 30pt
  xl: 20,
  xxl: 30,
  xxxl: 40,
  full: 9999,
};

export type RadiusTypes = keyof typeof radius;
