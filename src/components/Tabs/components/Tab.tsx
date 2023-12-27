import { Stack } from "components/containers/Stack/Stack";
import { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";

import { useTabs } from "../Tabs.props";

export type BodyProps = {
  style?: StyleProp<ViewStyle>;
  header: string;
};

export function Tab({ children, header }: PropsWithChildren<BodyProps>) {
  const { active, bodyProps } = useTabs();

  if (header !== active) return null;
  return (
    <Stack flexGrow {...bodyProps}>
      {children}
    </Stack>
  );
}
