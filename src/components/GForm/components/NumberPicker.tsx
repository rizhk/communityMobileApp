import { NumberPicker } from "components/Inputs";
import { NumberPickerProps } from "components/Inputs/NumberPicker";
import { View, ViewStyle } from "react-native";

import { BaseField } from "./BaseField";
import { GFieldProps, useGForm } from "../GForm.props";

export type GFieldItemType = {
  value: string;
  label: string;
};

export default function Picker(props: GFieldProps & Omit<NumberPickerProps, "value" | "setValue">) {
  const { containerStyle, valName, tx, text, ...rest } = props;
  const { handleChange, values } = useGForm();

  return (
    <BaseField style={containerStyle}>
      <View style={line}>
        <BaseField.Label tx={tx} text={text} />
        <NumberPicker
          {...rest}
          value={values[valName] as number}
          setValue={(val) => handleChange(valName)(val.toString())}
          visible={0}
        />
      </View>
    </BaseField>
  );
}

const line = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
} as ViewStyle;
