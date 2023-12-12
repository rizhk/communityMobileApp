import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";

export function MainLayout({ children }: PropsWithChildren) {
  return <View style={page}>{children}</View>;
}

const page = {
  flexGrow: 1,

  // overflow: "hidden",
  // backgroundColor: color.white,
} as ViewStyle;
