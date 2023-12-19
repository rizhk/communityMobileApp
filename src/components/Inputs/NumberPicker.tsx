import { TextStyle } from "react-native";
import { ThemeColorType } from "theme";

import { TextInput } from "./TextInput/TextInput";
import { i18n } from "i18n";

export interface NumberPickerProps {
  min?: number;
  max: number;
  value: number;
  setValue: (value: number) => void;
  style?: TextStyle;
  width?: number;
  color?: ThemeColorType;
  placeholderTx?: i18n.Scope;
  placeholder?: string;
}

export function NumberPicker(props: NumberPickerProps) {
  const { value, setValue, min, max, color, width = 80, placeholder, placeholderTx, style } = props;

  return (
    <TextInput
      keyboardType="numeric"
      value={value.toString()}
      onChangeText={(text) => {
        const n = Number(text);
        if (min !== undefined && n < min) setValue(min);
        else if (max !== undefined && n > max) setValue(max);
        else {
          setValue(n);
        }
      }}
      textAlign="center"
      color={color}
      style={{ width: width, ...style }}
      placeholder={placeholderTx ? i18n.t(placeholderTx) : placeholder}
    />
  );
}
