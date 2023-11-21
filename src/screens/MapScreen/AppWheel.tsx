import { Text } from "components/Text";
import { useRef, useState } from "react";
import { ScrollView, TextStyle, View, ViewStyle } from "react-native";
import { color, radius, spacing } from "theme";

export type item = { value: string; label: string };
export type AppWheelProps = {
  items: item[];
  style?: ViewStyle;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const itemSize = 24;
export default function AppWheel({ items, style = {} }: AppWheelProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const ref = useRef<ScrollView>(null);

  const handleScroll = (e: any) => {
    console.log(e.nativeEvent.contentOffset.y);
    const index = Math.round(e.nativeEvent.contentOffset.y / itemSize);
    setSelectedIndex(index);
    ref.current?.scrollTo({ y: index * itemSize, animated: true });
  };

  return (
    <View style={[container, style]}>
      <ScrollView
        style={scroll}
        showsVerticalScrollIndicator={false}
        // onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollEndDrag={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / itemSize);
          setSelectedIndex(index);
          handleScroll(e);
          ref.current?.scrollTo({ y: index * itemSize, animated: true });
        }}
        ref={ref}
      >
        <View style={inner}>
          {items.map((item: item, i) => (
            <Text text={item.label} style={[itemStyle, i == selectedIndex ? selectedItem : {}]} />
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
} as ViewStyle;

const scroll = {
  position: "absolute",
  height: 90,
} as ViewStyle;

const inner = {
  marginVertical: 34,
  justifyContent: "center",
  alignItems: "center",
  //   gap: 4,
} as ViewStyle;

const selectedItem = {
  fontWeight: "900",
  color: color.white,
} as TextStyle;

const itemStyle = {
  textAlign: "center",
  textAlignVertical: "center",
  height: 24,
  fontWeight: "900",
  color: color.grey600,
} as TextStyle;
