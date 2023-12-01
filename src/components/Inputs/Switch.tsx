import { Switch as RNSwitch, SwitchProps } from "react-native";
import { ThemeColorType, color as themeColor } from "theme";
import { shadowStyle } from "./styles";

interface Props extends SwitchProps {
  color?: ThemeColorType;
}

export function Switch(props: Props) {
  const { color = "primary", style, ...rest } = props;
  return (
    <RNSwitch
      {...rest}
      thumbColor={themeColor[color]}
      trackColor={{ false: themeColor.grey800, true: themeColor.white }}
      ios_backgroundColor={themeColor.grey800}
      style={[shadowStyle, style]}
    />
  );
}
