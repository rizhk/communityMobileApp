import { color, radius, spacing, textSize } from "theme";

const BASE = {
  buttonProps: {
    borderRadius: radius.xxl,
    padding: spacing.md,
    backgroundColor: color.primary,
    gap: spacing.sm,
    marginVertical: spacing.xs,
    "&:hover": {
      padding: spacing.md,
    },
    // justifyContent: "center",
    // alignItems: "center",
    // flexDirection: "row",
  },
  textProps: {},
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
    padding: 0,
  },
  //ADD NEW PRESETS HERE
};

export type ButtonPresets = keyof typeof presets;
