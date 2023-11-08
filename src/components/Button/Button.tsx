import { TouchableOpacity } from "react-native";
import { ButtonProps } from "./button.props";
import { Text } from "components/Text";
import { presets } from "./button.presets";
import { Icon } from "components/Icon";
import { IconSizeTypes, buttonSize, color } from "theme";

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

  // const sizeStyles = {
  //   xs: {
  //     /* Define styles for xs size here */
  //   },
  //   sm: {
  //     /* Define styles for sm size here */
  //   },
  //   md: {
  //     /* Define styles for md size here */
  //   },
  //   lg: {
  //     /* Define styles for lg size here */
  //   },
  //   xl: {
  //     /* Define styles for lg size here */
  //   },
  // }[size];

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
      {(tx !== undefined || text !== undefined) && <Text {...textProps} style={textStyle} />}
      {icon !== undefined && iconPosition === "right" && (
        <Icon icon={icon} size={size as IconSizeTypes} preset="button" />
      )}
    </TouchableOpacity>
  );
}
