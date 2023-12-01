import { ViewStyle, TextInput as RNTextInput, TextInputProps as RnTextInputProps } from "react-native";
import { color } from "theme";
import I18n from "i18n-js";
import { translate } from "i18n";
import { TextInputPresets, presets } from "./TextInput.presets";

export interface TextInputProps extends RnTextInputProps {
  placeholderTx?: I18n.Scope;
  preset?: TextInputPresets;
  error?: boolean;
}

export function TextInput(props: TextInputProps) {
  const { preset = "default", placeholderTx, placeholder, style, error, ...rest } = props;

  const inputStyles = [presets[preset].inputField, error ? inputError : {}, style];
  return (
    <RNTextInput
      placeholderTextColor={color.placeholder}
      placeholder={placeholderTx ? translate(placeholderTx) : placeholder}
      style={inputStyles}
      {...rest}
    />
  );
}

const inputError = {
  borderWidth: 2,
  borderColor: color.primary,
} as ViewStyle;
