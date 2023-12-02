import { Text } from "components/Text";
import I18n from "i18n-js";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { color, spacing } from "theme";
import { styleDirection } from "utils/formHelper";

import { GFieldItemType } from "../GForm.props";

export interface RadioProps {
  value: string;
  setValue: (value: string) => void;
  items: GFieldItemType<string, I18n.Scope>[];
  radioDirection?: "row" | "column";
  groupDirection?: "row" | "column";
  radioWidth?: number;
  radioStyle?: ViewStyle;
}

type RadioButtonProps = {
  selected: string;
  setSelected: React.Dispatch<string>;
  value: string;
  label: I18n.Scope;
  direction?: "row" | "column";
  width?: number;
  style?: ViewStyle;
};

function RadioButton(props: RadioButtonProps) {
  const { selected, setSelected, value, label, direction, width = 100, style } = props;
  const buttonStyle = {
    ...styleDirection(direction),
    justifyContent: direction === "row" ? "flex-start" : "center",
    width,
  } as ViewStyle;

  return (
    <TouchableOpacity style={[buttonStyle, radioButton, style]} onPress={() => setSelected(value)}>
      <View style={radioOuter}>{selected === value && <View style={radioInner} />}</View>
      <Text tx={label} preset="radioLabel" />
    </TouchableOpacity>
  );
}

export default function BaseRadio(props: RadioProps) {
  const { value, setValue, items, radioDirection, groupDirection = "row", radioWidth, radioStyle } = props;
  const containerPropStyle = [
    styleDirection(groupDirection),
    { justifyContent: groupDirection === "column" ? "flex-start" : "space-around" } as ViewStyle,
    container,
  ];

  return (
    <View style={containerPropStyle}>
      {items.map((item, index) => (
        <RadioButton
          selected={value}
          setSelected={setValue}
          {...item}
          direction={radioDirection ? radioDirection : groupDirection === "column" ? "row" : "column"}
          width={radioWidth}
          key={index}
          style={radioStyle}
        />
      ))}
    </View>
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

const container = {
  gap: spacing.md,
  flexWrap: "wrap",
} as ViewStyle;
