import { View, ViewStyle } from "react-native";
import { GFieldItemType, GFieldProps, useGForm } from "../GForm.props";
import { BaseField } from "./BaseField";
import { color, text } from "theme";
import { useMemo, useState } from "react";
import { inputFieldStyle } from "./styles";
import WheelPicker from "components/Wheel";

export interface PickerProps extends GFieldProps {
  items: GFieldItemType<string, string>[];
}

export default function Picker(props: PickerProps) {
  const { containerStyle, valName, tx, text, items } = props;
  const { handleChange, values } = useGForm();

  const getIndex = (val: string) => {
    const index = items.findIndex((item: any) => item.value === val.toString());
    return index === -1 ? 0 : index;
  };
  const [index, setIndex] = useState(getIndex(values[valName] as string));
  const onChange = (i: number) => {
    setIndex(i);
    handleChange(valName)(items[i].value);
  };

  const options = useMemo(() => items.map((item) => item.label), [items]);
  return (
    <BaseField style={containerStyle}>
      <View style={line}>
        <BaseField.Label tx={tx} text={text} />
        <WheelPicker
          selectedIndex={index}
          options={options}
          onChange={onChange}
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

const test = {
  ...inputFieldStyle,
} as ViewStyle;

const item = {
  color: color.white,
  fontSize: text.md,
};
