import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";
import { color, radius } from "theme";

export function MainLayout({ children }: PropsWithChildren) {
  return <View style={page}>{children}</View>;
}
const background = {
  // height: "100%",
} as ViewStyle;

const page = {
  flexGrow: 1,
  overflow: "hidden",
} as ViewStyle;
