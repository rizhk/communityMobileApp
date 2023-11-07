import { icon } from "theme";

const BASE = {
  size: icon.md,
  color: "white",
};

export const presets = {
  default: BASE,
  //ADD NEW PRESETS HERE
  title: { ...BASE, size: icon.xxxxl, marginTop: 48, alignSelf: "center" },
  button: { ...BASE, size: icon.md },
};

export type IconPresets = keyof typeof presets;
