import { TouchableOpacity } from "react-native";
import { ButtonProps } from "./button.props";
import Text from "components/Text/Text";
import { presets } from "./button.presets";

export default function Button(props: ButtonProps) {
  const {
    icon,
    iconPosition = "right",
    iconSize,
    preset = "default",
    onPress,
    tx = undefined,
    txOptions = undefined,
    text = undefined,
    textPreset,
  } = props;
  const textProps = { tx: tx, txOptions: txOptions, text: text, textPreset };

  const container = presets[preset];
  return (
    <TouchableOpacity onPress={onPress} style={container}>
      {(tx !== undefined || text !== undefined) && <Text {...textProps} />}
    </TouchableOpacity>
  );
}
