import { INFINIT_PARTICIPANTS } from "constants/global";
import { useMemo, useState } from "react";
import { View, ViewStyle } from "react-native";
import WheelPicker from "react-native-wheely";
import { ThemeColorType, color as themeColor, text } from "theme";
import { inputFieldStyle } from "theme/styles";
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
