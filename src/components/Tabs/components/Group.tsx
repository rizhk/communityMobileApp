import { Stack } from "components/containers/Stack";
import { PropsWithChildren } from "react";

import { useTabs } from "../Tabs.props";

export function TabsGroup(props: PropsWithChildren) {
  const { children } = props;
  const { group } = useTabs();

  return (
    <Stack direction="row" pa="sm" gap="md" {...group}>
      {children}
    </Stack>
  );
}
