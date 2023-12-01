import { TouchableOpacity, View, ViewStyle } from "react-native";
import { GFieldItemType, GFieldProps, useGForm } from "../GForm.props";
import { BaseField } from "./BaseField";
import I18n from "i18n-js";
import { Text } from "components/Text";
import { styleDirection } from "utils/formHelper";
import { color, spacing } from "theme";
import BaseRadio from "./BaseRadio";

export interface RadioProps extends GFieldProps {
  items: GFieldItemType<string, I18n.Scope>[];
  radioDirection?: "row" | "column";
  groupDirection?: "row" | "column";
  radioWidth?: number;
}

type RadioButtonProps = {
  selected: string;
  setSelected: React.Dispatch<string>;
  value: string;
  label: I18n.Scope;
  direction?: "row" | "column";
  width?: number;
};

function RadioButton(props: RadioButtonProps) {
  const { selected, setSelected, value, label, direction, width = 100 } = props;
  const buttonStyle = {
    ...styleDirection(direction),
    justifyContent: direction === "row" ? "flex-start" : "center",
    width: width,
  } as ViewStyle;

  return (
    <TouchableOpacity style={[buttonStyle, radioButton]} onPress={() => setSelected(value)}>
      <View style={radioOuter}>{selected === value && <View style={radioInner} />}</View>
      <Text tx={label} preset="radioLabel" />
    </TouchableOpacity>
  );
}

export default function Radio(props: RadioProps) {
  const { containerStyle, valName, tx, text, items, ...rest } = props;
  const { handleChange, values } = useGForm();

  return (
    <BaseField style={containerStyle}>
      {(tx !== undefined || text !== undefined) && <BaseField.Label tx={tx} text={text} />}
      <BaseRadio value={values[valName]} setValue={handleChange(valName)} items={items} {...rest} />
      <BaseField.ErrorLabel valName={valName} />
    </BaseField>
  );
}

const radioButton = {
  alignItems: "center",
  gap: spacing.xs,
} as ViewStyle;

const radioOuter = {
  height: 18,
  width: 18,
  borderRadius: 10,
  borderColor: color.primary,
  borderWidth: 1.2,
  backgroundColor: color.white,
  justifyContent: "center",
  alignItems: "center",
} as ViewStyle;

const radioInner = {
  height: 10,
  width: 10,
  borderRadius: 10,
  backgroundColor: color.primary,
} as ViewStyle;
