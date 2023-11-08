import { Text } from "components/Text";
import { View, ViewStyle } from "react-native";
import { color, radius } from "theme";

export default function MapScreen() {
  return (
    <View style={page}>
      <Text>MapScreen</Text>
    </View>
  );
}

const page = {
  backgroundColor: color.background,
  height: "100%",
  borderBottomLeftRadius: radius.xxl,
  borderBottomRightRadius: radius.xxl,
  shadowRadius: 5,
  shadowColor: "#000",
  shadowOpacity: 1,
  overflow: "hidden",
} as ViewStyle;
