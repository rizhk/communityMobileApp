import { Picker } from "@react-native-picker/picker";
import { Text } from "components/Text";
import { YStack } from "components/containers/Stack";
import { t } from "i18n-js";
import { Platform, View, ViewStyle } from "react-native";
import { ThemeColorType } from "theme";
import { ItemType } from "types/global";

import { color as themeColor } from "theme/color";

type WheelPickerProps<T> = {
  items: ItemType<T>[];
  value: string;
  setValue: (value: string) => void;
  color?: ThemeColorType;
  style?: ViewStyle;
};

export default function WheelPicker<T>(props: WheelPickerProps<T>) {
  const { color = "primary", style, items, value, setValue } = props;

  return (
    <YStack style={{ backgroundColor: "#9991" }}>
      <Text>WheelPicker</Text>
      <Text> value: {value}</Text>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => {
          setValue(itemValue);
          console.log(itemValue);
        }}
        // {...pickerProps()}
        // style={{ backgroundColor: "#0905" }}
        itemStyle={{ color: "white" }}
        selectionColor={themeColor.grey600 + "00"}
      >
        {items.map((item) => (
          <Picker.Item label={t(item.label)} value={item.value} />
        ))}
      </Picker>
    </YStack>
  );
}

function IOSPicker() {
  return <View></View>;
}
