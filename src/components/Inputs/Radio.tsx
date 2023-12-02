import { Text } from "components/Text";
import I18n from "i18n-js";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { ThemeColorType, color, spacing } from "theme";
import { shadowStyle } from "theme/styles";

import { ItemType } from "./types";

export interface RadioProps {
  value: string;
  setValue: (value: string) => void;
  items: ItemType<string, I18n.Scope>[];
  radioDirection?: "row" | "column";
  groupDirection?: "row" | "column";
  radioWidth?: number;
  radioStyle?: ViewStyle;
  style?: ViewStyle;
  color?: ThemeColorType;
}

type RadioButtonProps = {
  selected: string;
  setSelected: React.Dispatch<string>;
  value: string;
  label: I18n.Scope;
  direction?: "row" | "column";
  width?: number;
  style?: ViewStyle;
  buttonColor: ThemeColorType;
};

function RadioButton(props: RadioButtonProps) {
  const { selected, setSelected, value, label, direction, width = 100, style, buttonColor } = props;
  const buttonStyle = {
    flexDirection: direction,
    width: direction === "column" ? width : "",
  } as ViewStyle;
  const outer = [radioOuter, { borderColor: color[buttonColor] }];
  const inner = [radioInner, { backgroundColor: color[buttonColor] }];
  return (
    <TouchableOpacity style={[buttonStyle, radioButton, style]} onPress={() => setSelected(value)}>
      <View style={outer}>{selected === value && <View style={inner} />}</View>
      <Text tx={label} preset="radioLabel" />
    </TouchableOpacity>
  );
}

export function Radio(props: RadioProps) {
  const {
    value,
    setValue,
    items,
    radioDirection,
    groupDirection = "row",
    radioWidth,
    radioStyle,
    style,
    color = "primary",
  } = props;
  const containerPropStyle = [
    {
      flexDirection: groupDirection,
      justifyContent: groupDirection === "column" ? "center" : "space-around",
    } as ViewStyle,
    container,
    style,
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
          buttonColor={color}
        />
      ))}
    </View>
  );
}

const radioButton = {
  ...shadowStyle,
  alignItems: "center",
  gap: spacing.xs,
} as ViewStyle;

const radioOuter = {
  height: 18,
  width: 18,
  borderRadius: 10,
  borderWidth: 1.2,
  backgroundColor: color.white,
  justifyContent: "center",
  alignItems: "center",
} as ViewStyle;

const radioInner = {
  height: 10,
  width: 10,
  borderRadius: 10,
} as ViewStyle;

const container = {
  gap: spacing.md,
  flexWrap: "wrap",
  padding: spacing.xxs,
} as ViewStyle;
