import { Icon } from "components/Icon";
import { Text } from "components/Text";
import { TouchableOpacity, ViewStyle } from "react-native";
import { buttonSize, color as themeColor, icon as iconSize, spacing } from "theme";

import { presets } from "./button.presets";
import { ButtonProps } from "./button.props";

export function Button(props: ButtonProps) {
  const {
    icon,
    iconPosition = "right",
    iconScale = 1,
    preset = "default",
    tx,
    txOptions,
    text,
    textPreset = "button",
    textStyle,
    style,
    rounded = false,
    size = "md",
    color = "primary",
    textColor,
    iconColor,
    ...rest
  } = props;

  const textProps = { tx, txOptions, text, preset: textPreset };
  const roundStyle = rounded ? { width: buttonSize[size], height: buttonSize[size], borderRadius: 200 } : {};
  const buttonStyle = [presets[preset](color), { padding: spacing[size] }, roundStyle, style];
  const textStyles = [preset === "outlined" || preset === "plainText" ? { color: themeColor[color] } : {}, textStyle];

  function ButtonIcon() {
    if (icon === undefined) return null;
    return (
      <Icon icon={icon} color={iconColor ?? textColor ?? "white"} size={iconScale * iconSize[size]} preset="button" />
    );
  }

  return (
    <TouchableOpacity style={buttonStyle as ViewStyle} {...rest}>
      {icon !== undefined && iconPosition === "left" && <ButtonIcon />}
      {(tx !== undefined || text !== undefined) && (
        <Text color={textColor} {...textProps} size={size} style={textStyles} />
      )}
      {icon !== undefined && iconPosition === "right" && <ButtonIcon />}
    </TouchableOpacity>
  );
}
