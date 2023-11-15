import { spacing, text } from "theme";

//Example how to extend presets with auto values
// export const textPresets = Object.fromEntries(
//   Object.entries(text).map(([key, fontSize]) => [key, { fontSize }])
// );
// export type SizePresets = keyof typeof textPresets;

const BASE = {
  width: "100%",
  height: "100%",
};

export const presets = {
  default: BASE,
  small: {
    ...BASE,
    height: "50%",
  },
};

export type MapPresets = keyof typeof presets;
