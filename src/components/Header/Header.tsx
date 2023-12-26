import { Text } from "components/Text";
import { XStack } from "components/containers/Stack/Stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type HeaderProps = {
  title: string;
  menu?: JSX.Element;
};

export default function Header({ title, menu }: HeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <XStack bc="backgroundLight" h={80} jc="center">
      <Text text={title} preset="header" />
    </XStack>
  );
}
