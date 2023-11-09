import { spacing, textSize } from "theme";

//Example how to extend presets with auto values
export const textPresets = Object.fromEntries(
  Object.entries(textSize).map(([key, fontSize]) => [key, { fontSize }])
);

// export const textPresets2 = {
//   xxs: {
//     fontSize: textSize.xxs,
//     paddingY: spacing.xs,
//   },
//   xs: {
//     fontSize: textSize.xs,
//   },
//   sm: {
//     fontSize: textSize.sm,
//   },
//   md: {
//     fontSize: textSize.md,
//   },
//   lg: {
//     fontSize: textSize.lg,
//   },
//   xl: {
//     fontSize: textSize.xl,
//   },
//   xxl: {
//     fontSize: textSize.xxl,
//   },
// };

const BASE = {
  width: "100%",
  height: "100%",
};

export const presets = {
  default: BASE,
  small: {
    ...BASE,
    width: "50%",
  },
  //ADD NEW PRESETS HERE
};

export type MapPresets = keyof typeof presets;
export type SizePresets = keyof typeof textPresets;
