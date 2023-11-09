import { TouchableOpacity } from "react-native";
import { ButtonProps } from "./button.props";
import { Text } from "components/Text";
import { presets } from "./button.presets";
import { Icon } from "components/Icon";
import { IconSizeTypes, buttonSize, color as themeColor } from "theme";

export function Button(props: ButtonProps) {
  const {
    icon,
    iconPosition = "right",
    preset = "default",
    tx,
    txOptions,
    text,
    textPreset = "button",
    style,
    rounded = false,
    size,
    color = "primary",
    ...rest
  } = props;

  const textProps = { tx: tx, txOptions: txOptions, text: text, preset: textPreset };
  const roundStyle = rounded
    ? { width: buttonSize[size ?? "md"], height: buttonSize[size ?? "md"], borderRadius: 100 }
    : {};
  const buttonStyle = [presets[preset](color), roundStyle, style];
  const textStyle = preset === "outlined" ? { color: themeColor[color] } : {};

  return (
    <TouchableOpacity style={buttonStyle} {...rest}>
      {icon !== undefined && iconPosition === "left" && (
        <Icon icon={icon} size={size as IconSizeTypes} preset="button" />
      )}
      {(tx !== undefined || text !== undefined) && (
        <Text {...textProps} size={size} style={textStyle} />
      )}
      {icon !== undefined && iconPosition === "right" && (
        <Icon icon={icon} size={size as IconSizeTypes} preset="button" />
      )}
    </TouchableOpacity>
  );
}
