import { color, radius, spacing } from "theme";

const BASE = {
  width: "100%",
  height: "100%",
};

const TEXT_BASE = {
  fontSize: 14,
};

export const textPresets = {
  default: TEXT_BASE,
  sd: {
    text,
  },
  //ADD NEW TEXT PRESETS HERE
};

export const presets = {
  default: BASE,
  small: {
    ...BASE,
    width: "50%",
  },
  //ADD NEW PRESETS HERE
};

export type MapPresets = keyof typeof presets & keyof typeof textPresets;
