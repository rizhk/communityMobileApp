import { icon } from "theme";

const BASE = {
  size: icon.md,
  color: "white",
};

export const presets = {
  default: BASE,
  //ADD NEW PRESETS HERE
  title: { ...BASE, size: icon.xxl, marginTop: 48, alignSelf: "center" },
};

export type IconPresets = keyof typeof presets;
