import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { XStack, YStack } from "components/containers";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { SafeAreaView, useWindowDimensions } from "react-native";
import { Text } from "components/Text";

import { ScrollView } from "react-native-gesture-handler";

import { ActivityItem } from "types/activity";
import EditorJsParser from "components/EditorJsParser";
import RenderHTML from "react-native-render-html";
import { formatDate } from "utils/helper";
import { IconForType } from "components/Images/IconType";
import { color } from "theme";

type Props = NativeStackScreenProps<MainStackParamList, "activity">;

export function ActivityScreen({ route }: Props) {
  const { title, contentRTE, contentQuill, publishedAt, startDate, endDate, type }: ActivityItem =
    route.params.activity;
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
            <Text text={formatDate(startDate)} size="xs" color="grey400" />
            {endDate && <Text text={` - ${formatDate(endDate)}`} size="xs" color="grey400" />}
            {contentRTE && <EditorJsParser content={contentRTE} />}
            {contentQuill && <RenderHTML contentWidth={width} source={{ html: contentQuill }} />}
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
