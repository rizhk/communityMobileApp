import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";
import { color, radius } from "theme";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <View style={background}>
      <View style={page}>{children}</View>
    </View>
  );
}
const background = {
  height: "100%",
  backgroundColor: color.backgroundLight,
} as ViewStyle;

const page = {
  backgroundColor: color.background,
  height: "100%",
  borderBottomLeftRadius: radius.xxl,
  borderBottomRightRadius: radius.xxl,
  overflow: "hidden",
} as ViewStyle;
