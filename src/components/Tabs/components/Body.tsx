import { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";

import { useTabs } from "../Tabs.props";
import { Stack } from "components/containers/Stack";

export type BodyProps = {
  style?: StyleProp<ViewStyle>;
  value?: any;
};

export function TabsBody({ children, value }: PropsWithChildren<BodyProps>) {
  const { selected, body } = useTabs();
  if (value && value !== selected) return null;
  return (
    <Stack flexGrow {...body}>
      {children}
    </Stack>
  );
}
