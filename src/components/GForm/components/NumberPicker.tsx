import { View, ViewStyle } from "react-native";
import { GFieldProps, useGForm } from "../GForm.props";
import { BaseField } from "./BaseField";
import WheelPicker from "react-native-wheely";
import { color, radius, spacing, text } from "theme";
import { useMemo, useState } from "react";

export interface PickerProps extends GFieldProps {
  selectedIndex: number;
  values: { value: any; label: string }[];
}

export default function Picker(props: PickerProps) {
  const { containerStyle, valName, tx, text, selectedIndex, values, ...rest } = props;
  const { handleChange } = useGForm();

  const onChange = (index: number) => {
    handleChange(valName)(values[index].value);
  };

  const options = useMemo(() => values.map((item) => item.label), [values]);
  return (
    <BaseField style={containerStyle}>
      <View style={line}>
        <BaseField.Label tx={tx} text={text} />
        <WheelPicker
          selectedIndex={selectedIndex}
          options={options}
          onChange={onChange}
          containerStyle={container}
          selectedIndicatorStyle={test}
          itemTextStyle={item}
          visibleRest={0}
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

const container = {
  borderRadius: radius.md,
} as ViewStyle;

const test = {
  backgroundColor: color.inputBackground,
  padding: spacing.sm,
  color: color.white,
} as ViewStyle;

const item = {
  color: color.white,
  fontSize: text.md,
};
