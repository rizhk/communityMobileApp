import { ThemeColorType, color as themeColor } from "theme";
import { IconProps } from "./icon.props";
import { presets } from "./icon.presets";

export default function Icon(props: IconProps) {
  const { icon, size, color, preset = "default", ...rest } = props;
  const Iconi = icon;
  const sizeProp = size || presets[preset].size;
  const colorProp = color || presets[preset].color;

  const properties = {
    ...presets[preset],
    height: sizeProp,
    width: sizeProp,
    color: themeColor[colorProp as ThemeColorType],
  };
  return <Iconi {...properties} {...rest} />;
}
