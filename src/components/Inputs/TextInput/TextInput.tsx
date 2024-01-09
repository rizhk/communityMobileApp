import { translate } from "i18n";
import I18n from "i18n-js";
import { useState } from "react";
import { ViewStyle, TextInput as RNTextInput, TextInputProps as RnTextInputProps } from "react-native";
import { ThemeColorType, color as themeColor } from "theme";
import { inputFieldStyle, shadowFocus } from "theme/styles";

import { TextInputPresets, presets } from "./TextInput.presets";

export interface TextInputProps extends RnTextInputProps {
  placeholderTx?: I18n.Scope;
  preset?: TextInputPresets;
  error?: boolean;
  textAlign?: "left" | "center" | "right";
  color?: ThemeColorType;
  multiline?: boolean;
}

export function TextInput(props: TextInputProps) {
  const { preset = "default", placeholderTx, placeholder, style, error, textAlign, multiline, color, ...rest } = props;
  const inputStyles = [
    presets[preset].inputField,
    error ? inputError : {},
    { textAlign },
    style,
    multiline ? multilineStyle : {},
  ];
  const [focus, setFocus] = useState(false);

  return (
    <RNTextInput
      placeholderTextColor={themeColor.placeholder}
      onFocus={() => {
        setFocus(true);
      }}
      onBlur={() => {
        setFocus(false);
      }}
      placeholder={placeholderTx ? translate(placeholderTx) : placeholder}
      style={[inputStyles, focus ? shadowFocus(color) : {}]}
      multiline={multiline}
      {...rest}
    />
  );
}

const inputError = {
  borderWidth: 2,
  borderColor: themeColor.primary,
} as ViewStyle;

const multilineStyle = {
  height: "auto",
  paddingTop: inputFieldStyle.paddingVertical,
} as ViewStyle;
