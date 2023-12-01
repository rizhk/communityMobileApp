import { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useTabs } from "../Tabs.props";

export type BodyProps = {
  style?: StyleProp<ViewStyle>;
  value?: any;
};

export function TabsBody({ children, style, value }: PropsWithChildren<BodyProps>) {
  const { selected } = useTabs();
  if (value && value !== selected) return null;
  return <View style={[body, style]}>{children}</View>;
}

const body = {
  flexGrow: 1,
  flexShrink: 1,
  overflow: "scroll",
} as ViewStyle;
