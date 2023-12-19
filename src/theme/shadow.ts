import { color } from "./color";

export const shadow = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xxxs: {
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  xxs: {
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  xs: {
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  sm: {
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
  },
  md: {
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 16,
  },
  lg: {
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 24,
  },
  xl: {
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 32 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 32,
  },
  xxl: {
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 40 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 40,
  },
  xxxl: {
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 48 },
    shadowOpacity: 0.25,
    shadowRadius: 48,
    elevation: 48,
  },
  // ... Continue with md, lg, xl, xxl, xxxl
};

export type ShadowSizeType = keyof typeof shadow;
