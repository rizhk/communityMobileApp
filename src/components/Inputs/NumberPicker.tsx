import { ViewStyle } from "react-native";
import { ThemeColorType } from "theme";
import { TextInput } from "./TextInput/TextInput";

export interface NumberPickerProps {
  min?: number;
  max: number;
  value: number;
  setValue: (value: number) => void;
  style?: ViewStyle;
  width?: number;
  color?: ThemeColorType;
}

export function NumberPicker(props: NumberPickerProps) {
  const { value, setValue, min = 0, max, color, width = 80 } = props;

  return (
    <TextInput
      keyboardType="numeric"
      value={value.toString()}
      onChangeText={(text) => {
        const n = Number(text);
        if (n < min) setValue(min);
        else if (n > max) setValue(max);
        else {
          setValue(n);
        }
      }}
      textAlign="center"
      color={color}
      style={{ minWidth: width }}
    />
  );
}
