import { SVGAttributes } from "react";
import { IconSizeTypes, ThemeColorType } from "theme";
import { IconPresets } from "./icon.presets";

export interface IconProps extends SVGAttributes<SVGAElement> {
  icon: React.FunctionComponent<SVGAttributes<SVGElement>>;
  size?: number | IconSizeTypes;
  color?: ThemeColorType;
  preset?: IconPresets;
}
