import { color, radius, spacing, textSize } from "theme";

const BASE = {
  width: "100%",
  height: "100%",
};

const TEXT_BASE = {
  fontSize: 14,
};

// export const textPresets = {
//   xxs: {
//     fontSize: textSize.xxs,
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
// export const textPresets = {};

// for (const key in textSize) {
//   if (Object.hasOwnProperty.call(textSize, key)) {
//     textPresets[key] = {
//       fontSize: textSize[key],
//     };
//   }
// }

export const textPresets: Record<string, { fontSize: number }> = Object.fromEntries(
  Object.entries(textSize).map(([key, fontSize]) => [key, { fontSize }])
);

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
