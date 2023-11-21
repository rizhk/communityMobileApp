import { Text } from "components/Text";
import { useRef, useState } from "react";
import { Platform, ScrollView, TextStyle, View, ViewStyle } from "react-native";
import { color, radius, spacing } from "theme";

export type item = { value: string; label: string };
export type AppWheelProps = {
  items: item[];
  style?: ViewStyle;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  itemSize?: number;
  itemStyle?: TextStyle;
};

export default function AppWheel({ items, value, setValue, style, itemSize = 28, itemStyle }: AppWheelProps) {
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
        style={scroll}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollEndDrag={(e) => {
          handleScroll(e);
          ref.current?.scrollTo({ y: getIndex(e) * itemSize, animated: true });
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
  backgroundColor: color.inputBackground,
  borderRadius: radius.md,
  paddingHorizontal: spacing.sm,
  color: color.white,
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  height: 34,
  width: 80,
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
