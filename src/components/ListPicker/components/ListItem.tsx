import { Text } from "components/Text";
import { Stack, XStack } from "components/containers";
import { StackProps } from "components/containers/Stack/Stack.props";

export type ListItemType = {
  text?: string;
  tx?: string;
  icon?: JSX.Element;
  value: any;
  isSelected: boolean;
  size: number;
};

export type ListItemProps = ListItemType & {
  itemProps?: StackProps;
};

export default function ListItem(props: ListItemProps) {
  const { itemProps, text, tx, icon, size = 20 } = props;

  return (
    <XStack jc="center" ai="center" bc="primary" {...itemProps}>
      {icon}
      <Text tx={tx} text={text} style={{ flexGrow: 1 }} />
      <Stack br="full" bc="grey400" h={size} w={size} />
    </XStack>
  );
}
