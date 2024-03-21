import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stack, YStack } from "components/containers";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { SafeAreaView } from "react-native";
import { Text } from "components/Text";
import { ActualityItem } from "types/actuality";
import EditorJsParser from "components/EditorJsParser";
import { formatDate } from "utils/helper";

type Props = NativeStackScreenProps<MainStackParamList, "actuality">;

export function ActualityScreen({ navigation, route }: Props) {
  const { title, contentRTE, publishedAt }: ActualityItem = route.params.actuality;

  return (
    <SafeAreaView>
      <YStack jc="space-evenly">
        <YStack jc="center">
          <Text text={formatDate(publishedAt)} size="xs" color="grey400" />
          <Text color="primary" size="lg" preset="bold">
            {title}
          </Text>
          {contentRTE && <EditorJsParser content={contentRTE} />}
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}
