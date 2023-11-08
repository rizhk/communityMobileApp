import { color, radius, spacing } from "theme";

const BASE = {
  borderRadius: radius.xxl,
  padding: spacing.md,
  backgroundColor: color.primary,
  gap: spacing.sm,
  marginVertical: spacing.sm,
};

export const presets = {
  default: BASE,
  outlined: {
    ...BASE,
    backgroundColor: color.transparent,
    borderWidth: 2,
    borderColor: color.primary,
  },
  plainText: {
    ...BASE,
    backgroundColor: color.transparent,
    borderWidth: 0,
    borderColor: color.transparent,
    marginVertical: 0,
  },
  //ADD NEW PRESETS HERE
};

export type ButtonPresets = keyof typeof presets;
