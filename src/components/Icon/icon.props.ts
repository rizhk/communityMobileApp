import { SVGAttributes } from "react";
import { ThemeColorType } from "theme";
import { IconPresets } from "./icon.presets";

export interface IconProps extends SVGAttributes<SVGAElement> {
  icon: React.FunctionComponent<SVGAttributes<SVGElement>>;
  size?: number;
  color?: ThemeColorType;
  preset?: IconPresets;
}
