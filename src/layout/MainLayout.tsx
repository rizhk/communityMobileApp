import { View, ViewStyle } from "react-native";
import { color, radius } from "theme";
import { PropsWithChildren } from "react";

export function MainLayout({ children }: PropsWithChildren) {
  return <View style={page}>{children}</View>;
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
