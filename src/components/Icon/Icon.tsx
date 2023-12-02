import { ThemeColorType, color as themeColor, icon as iconSize } from "theme";

import { presets } from "./icon.presets";
import { IconProps } from "./icon.props";

export function Icon(props: IconProps) {
  const { icon, size, color, preset = "default", ...rest } = props;
  const Iconi = icon;
  const sizeValue = size ? (typeof size == "number" ? size : iconSize[size]) : presets[preset].size;
  const colorProp = color || presets[preset].color;

  const properties = {
    ...presets[preset],
    height: sizeValue,
    width: sizeValue,
    color: themeColor[colorProp as ThemeColorType],
  };
  return <Iconi {...properties} {...rest} />;
}
