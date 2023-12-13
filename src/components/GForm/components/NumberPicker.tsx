import { NumberPicker } from "components/Inputs";
import { NumberPickerProps } from "components/Inputs/NumberPicker";
import { XStack } from "components/containers/Stack";

import { BaseField } from "./BaseField";
import { GFieldProps, useGForm } from "../GForm.props";
import { Pressable, TextInput, ViewStyle } from "react-native";
import { Text } from "components/Text";
import { color } from "theme";
import { useState } from "react";
import { INFINIT_PARTICIPANTS } from "constants/global";
import { inputFieldStyle } from "theme/styles";

export type GFieldItemType = {
  value: string;
  label: string;
};

export default function Picker(props: GFieldProps & Omit<NumberPickerProps, "value" | "setValue">) {
  const { containerStyle, valName, tx, text, min, max, ...rest } = props;
  const { handleChange, values, themeColor = "primary" } = useGForm();
  const [noLimit, setNoLimit] = useState(false);
  const [focus, setFocus] = useState(false);
  const [displayValue, setDisplayValue] = useState(values[valName] as string);

  const onUnlimitedClick = () => {
    setNoLimit(!noLimit);
    handleChange(valName)(String(INFINIT_PARTICIPANTS));
  };

  return (
    <BaseField style={containerStyle}>
      <XStack ai="center" jc="space-between">
        <BaseField.Label tx={tx} text={text} />
        <Text>Test {values[valName]}</Text>
        <XStack ai="center" jc="center" br="md" bc={themeColor}>
          <TextInput
            value={displayValue}
            onChangeText={(text) => {
              const n = Number(text);
              if (min !== undefined && n < min) setDisplayValue(String(min));
              else if (max !== undefined && n > max) setDisplayValue(String(max));
              else {
                setDisplayValue(String(n));
              }
            }}
            style={inputStyle}
          />
          <Pressable onPress={onUnlimitedClick} style={[iButton, noLimit ? selected : unselected]}>
            <Text text=" ∞ " style={{ color: noLimit ? color.white : color.grey500 }} />
          </Pressable>
        </XStack>
      </XStack>
    </BaseField>
  );
}

const inputStyle = {
  ...inputFieldStyle,
} as ViewStyle;

const iButton = {
  alignSelf: "stretch",
  justifyContent: "center",
  alignItems: "center",
} as ViewStyle;

const selected = {
  width: 100,
} as ViewStyle;

const unselected = {
  width: 50,
} as ViewStyle;
