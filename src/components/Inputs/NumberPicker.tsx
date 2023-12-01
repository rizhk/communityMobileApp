import { View, ViewStyle } from "react-native";
import { color, text } from "theme";
import { useMemo, useState } from "react";
import { inputFieldStyle } from "theme/styles";
import WheelPicker from "react-native-wheely";
import { INFINIT_PARTICIPANTS } from "constants/global";

export interface NumberPickerProps {
  min?: number;
  max: number;
  step?: number;
  value: number;
  padding?: number;
  setValue: (value: number) => void;
  hasInfinit?: boolean;
  style?: ViewStyle;
  visible?: number;
  width?: number;
}

export function NumberPicker(props: NumberPickerProps) {
  const { value, setValue, min = 0, step = 1, max, hasInfinit, padding = 0, style, visible = 1, width = 80 } = props;
  const options = useMemo(() => {
    const options = [];
    if (hasInfinit) {
      options.push("∞");
    }
    for (let i = min; i <= max; i += step) {
      options.push(i.toString().padStart(padding, "0"));
    }
    return options;
  }, [min, max, step, hasInfinit, padding]);

  const getIndex = (val: number) => {
    const index = options.findIndex((item: any) => item.value === val.toString());
    return index === -1 ? 0 : index;
  };

  const [index, setIndex] = useState(getIndex(value));

  const onChange = (i: number) => {
    setIndex(i);
    if (hasInfinit && i === 0) setValue(INFINIT_PARTICIPANTS);
    else setValue(Number(options[i]));
  };

  return (
    <View style={{ width: width }}>
      <WheelPicker
        selectedIndex={index}
        options={options}
        onChange={onChange}
        selectedIndicatorStyle={[container, style]}
        itemTextStyle={item}
        visibleRest={visible}
      />
    </View>
  );
}

const container = {
  ...inputFieldStyle,
} as ViewStyle;

const item = {
  color: color.white,
  fontSize: text.md,
};
