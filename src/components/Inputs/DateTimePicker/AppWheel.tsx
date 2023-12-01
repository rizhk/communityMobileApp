import { Text } from "components/Text";
import { useRef, useState } from "react";
import { Platform, ScrollView, TextStyle, View, ViewStyle } from "react-native";
import { color } from "theme";

//in the making, it's a whell without flatlist to get rid of virtualized list warning
export type item = { value: string; label: string };
export type AppWheelProps = {
  items: item[];
  style?: ViewStyle;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  itemSize?: number;
  itemStyle?: TextStyle;
  enableScroll?: boolean;
};

export default function AppWheel(props: AppWheelProps) {
  const { items, value, setValue, style, itemSize = 28, itemStyle, enableScroll = true } = props;
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const i = items.findIndex((item) => {
      return item.value == value;
    });
    if (i !== -1) return i;
    return 0;
  });
  const ref = useRef<ScrollView>(null);
  const offsetPlatform = Platform.OS === "ios" ? 0 : -3;
  const getIndex = (e: any) => Math.round(e.nativeEvent.contentOffset.y / itemSize);

  const handleScroll = (e: any) => {
    const index = getIndex(e);
    if (index < 0 || index > items.length - 1) return;
    setSelectedIndex(index);
    setValue(items[index].value);
  };

  return (
    <View style={[container, style]}>
      <ScrollView
        scrollEnabled={enableScroll}
        style={scroll}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollEndDrag={(e) => {
          handleScroll(e);
          let y = getIndex(e) * itemSize;
          if (y > itemSize * (items.length - 1)) y = itemSize * (items.length - 1);
          ref.current?.scrollTo({ y: y, animated: true });
          console.log("y:", y);
        }}
        ref={ref}
      >
        <View style={inner}>
          {items.map((item: item, i) => (
            <Text
              text={item.label}
              style={[
                itemDefaultStyle,
                itemStyle,
                {
                  transform: [{ translateY: offsetPlatform }],
                  height: itemSize,
                  fontSize: 18,
                  opacity: (1 - Math.abs(i - selectedIndex) * 0.2) ** 2,
                },
              ]}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const container = {
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  transform: [{ translateY: 17 }],
} as ViewStyle;

const scroll = {
  position: "absolute",
  height: 150,
} as ViewStyle;

const inner = {
  marginVertical: 63,
  justifyContent: "center",
  alignItems: "center",
} as ViewStyle;

const itemDefaultStyle = {
  color: color.white,
  textAlign: "center",
  textAlignVertical: "center",
  fontWeight: "900",
  fontFamily: "",
} as TextStyle;
