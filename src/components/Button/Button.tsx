import { TouchableOpacity } from "react-native";
import { ButtonProps } from "./button.props";
import { Text } from "components/Text";
import { presets } from "./button.presets";
import { Icon } from "components/Icon";
import { IconSizeTypes, buttonSize, color, textSize as textStyle } from "theme";
import { TextSizeTypes } from "components/Text/text.props";

export function Button({
  icon,
  iconPosition = "right",
  preset = "default",
  onPress,
  tx,
  txOptions,
  text,
  textPreset = "button",
  style,
  rounded = false,
  size = "md", //FIXME: C'est iconSize plutôt non ?
  ...rest
}: ButtonProps) {
  const textProps = { tx: tx, txOptions: txOptions, text: text, preset: textPreset };
  const styles = presets[preset];
  const textStyle = preset === "outlined" ? { color: color.primary } : {};

  const sizeStyles = {
    xxs: {
      fontSize: 10,
    },
    xs: {
      fontSize: textStyle[size as TextSizeTypes],
    },
    sm: {
      fontSize: 12,
    },
    md: {
      fontSize: 14,
    },
    lg: {
      fontSize: 16,
    },
    xl: {
      fontSize: 18,
    },
  }[size];
  const textStyles = [textStyle, sizeStyles];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        { flexDirection: "row", justifyContent: "center", alignItems: "center" }, //FIXME: Pourquoi pas mettre ça dans Base ?
        styles,
        rounded ? { width: buttonSize[size], height: buttonSize[size], borderRadius: 100 } : {},
        style,
      ]}
      {...rest}
    >
      {icon !== undefined && iconPosition === "left" && (
        <Icon icon={icon} size={size as IconSizeTypes} preset="button" />
      )}
      {(tx !== undefined || text !== undefined) && <Text {...textProps} style={textStyles} />}
      {icon !== undefined && iconPosition === "right" && (
        <Icon icon={icon} size={size as IconSizeTypes} preset="button" />
      )}
    </TouchableOpacity>
  );
}
