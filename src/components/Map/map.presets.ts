import { color, radius, spacing } from "theme";

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
