import { Tick } from "assets/svg";
import { Text } from "components/Text";
import { Stack, XStack } from "components/containers";
import { StackProps } from "components/containers/Stack/Stack.props";
import { ThemeColorType, color as themeColor } from "theme";

export type ListItemType = {
  text?: string;
  tx?: string;
  icon?: JSX.Element;
  value: any;
};

export type ListItemProps = ListItemType & {
  containerProps?: StackProps;
  isSelected?: boolean;
  color?: ThemeColorType;
  checkSize?: number;
  onPress?: () => void;
};

export default function ListItem(props: ListItemProps) {
  const { containerProps, text, tx, icon, checkSize = 30, color, isSelected, onPress } = props;

  return (
    <XStack onPress={onPress} jc="center" ai="center" my="xxs" pa="xxs" {...containerProps}>
      <Stack w={40} jc="center" ai="center">
        {icon}
      </Stack>
      <Text tx={tx} size="md" text={text} style={{ flexGrow: 1 }} />
      <Stack
        br="full"
        bc={isSelected ? color : "transparent"}
        borderWidth={2}
        borderColor={color}
        h={checkSize}
        w={checkSize}
        jc="center"
        ai="center"
      >
        {isSelected && <Tick color={themeColor.white} height={15} width={15} />}
      </Stack>
    </XStack>
  );
}
