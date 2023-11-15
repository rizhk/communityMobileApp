import { spacing, text } from "theme";

//Example how to extend presets with auto values
export const textPresets = Object.fromEntries(
  Object.entries(text).map(([key, fontSize]) => [key, { fontSize }])
);

// export const textPresets2 = {
//   xxs: {
//     fontSize: text.xxs,
//     paddingY: spacing.xs,
//   },
//   xs: {
//     fontSize: text.xs,
//   },
//   sm: {
//     fontSize: text.sm,
//   },
//   md: {
//     fontSize: text.md,
//   },
//   lg: {
//     fontSize: text.lg,
//   },
//   xl: {
//     fontSize: text.xl,
//   },
//   xxl: {
//     fontSize: text.xxl,
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
