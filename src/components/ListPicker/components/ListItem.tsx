import { Text } from "components/Text";
import { XStack } from "components/containers";
import { StackProps } from "components/containers/Stack/Stack.props";

export type ListItemType = {
  text?: string;
  tx?: string;
  icon?: JSX.Element;
  value: any;
};

export type ListItemProps = ListItemType & {
  itemProps?: StackProps;
};

export default function ListItem(props: ListItemProps) {
  const { itemProps, text, tx, icon } = props;

  return (
    <XStack jc="center" ai="center" {...itemProps}>
      {icon}
      <Text tx={tx} text={text} />
    </XStack>
  );
}
