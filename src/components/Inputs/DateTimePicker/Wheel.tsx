import WheelPicker from "components/Wheel";
import { useMemo, useState } from "react";
import { View, ViewStyle, TextStyle } from "react-native";
// import WheelPicker from "react-native-wheely";

type ItemType = {
  value: string;
  label: string;
};

type WheelProps = {
  value: any;
  setValue: (val: any) => void;
  items: ItemType[];
  nbItems?: number;
  itemHeight?: number;
  itemWidth?: number;
  style?: ViewStyle;
  scrollEnable?: boolean;
};

export default function Wheel(props: WheelProps) {
  const { value, setValue, items, nbItems = 3, itemHeight = 28, itemWidth = 40, style, scrollEnable = false } = props;
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const i = items.findIndex((item) => {
      return item.value === value;
    });
    if (i !== -1) return i;
    return 0;
  });
  const options = useMemo(() => items.map((item) => item.label), []);
  const onChange = (index: number) => {
    setSelectedIndex(index);
    setValue(items[index].value);
  };

  return (
    <View
      style={{
        height: itemHeight * nbItems - itemHeight * 0.3,
        width: itemWidth,
        ...container,
        ...style,
      }}
    >
      <WheelPicker
        selectedIndex={selectedIndex}
        options={options}
        onChange={onChange}
        visibleRest={nbItems}
        selectedIndicatorStyle={selectedItem}
        itemStyle={{ height: itemHeight, ...item }}
        itemHeight={itemHeight}
        itemTextStyle={itemText}
        containerStyle={{ top: -nbItems * itemHeight, ...wheelStyle }}
        flatListProps={{ scrollEnabled: scrollEnable }}
      />
    </View>
  );
}

const container = {
  //   backgroundColor: "#3333",
  overflow: "hidden",
  position: "relative",
} as ViewStyle;

const wheelStyle = {
  position: "absolute",
  alignSelf: "center",
} as ViewStyle;

const selectedItem = {
  color: "white",
  top: "25%",
} as ViewStyle;

const item = {
  margin: "auto",
  paddingHorizontal: 5,
} as ViewStyle;

const itemText = {
  color: "white",
  fontWeight: "900",
  fontSize: 18,
} as TextStyle;
