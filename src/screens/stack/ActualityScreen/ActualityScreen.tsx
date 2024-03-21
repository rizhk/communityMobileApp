import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stack, XStack, YStack } from "components/containers";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { SafeAreaView, useWindowDimensions } from "react-native";
import { Text } from "components/Text";
import { ActualityItem } from "types/actuality";
import EditorJsParser from "components/EditorJsParser";
import { formatDate } from "utils/helper";

import RenderHtml from "react-native-render-html";
import { ScrollView } from "react-native-gesture-handler";
import { IconForType } from "components/Images/IconType";
import { color } from "theme";

type Props = NativeStackScreenProps<MainStackParamList, "actuality">;

export function ActualityScreen({ navigation, route }: Props) {
  const { title, contentRTE, contentQuill, publishedAt, type }: ActualityItem = route.params.actuality;
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView>
      <ScrollView>
        <YStack jc="space-evenly">
          <YStack jc="center">
            <XStack gap="xs">
              <IconForType type={type} color={color.grey400} />
              <Text text={formatDate(publishedAt)} size="xs" color="grey400" />
            </XStack>
            <Text color="primary" size="lg" preset="bold">
              {title}
            </Text>
            {contentRTE && <EditorJsParser content={contentRTE} />}
            {contentQuill && <RenderHtml contentWidth={width} source={{ html: contentQuill }} />}
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
