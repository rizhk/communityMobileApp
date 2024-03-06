import { Text } from "components/Text";
import { Stack, XStack, YStack } from "components/containers/Stack/Stack";

import { formatDateFromToday } from "utils/Date";

import { ActualityItem } from "types/actuality";
import { QuickImage } from "components/ImageComponent";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { createEditorJsViewer } from "editorjs-viewer-native";
import { View } from "react-native";
import EditorJsParser from "components/EditorJsParser";

type ActualityCardProps = {
  actuality: ActualityItem;
  navigation: NativeStackNavigationProp<MainStackParamList>; // Consider using a more specific type for navigation if possible
};

export function ActualityCard({ navigation, actuality }: ActualityCardProps) {
  const { title, content, contentRTE, startDate, cover } = actuality;

  const EditorJsViewerNative = createEditorJsViewer();

  return (
    <Stack br="xs" bc="backgroundCard" overflow="hidden">
      <YStack
        padding="md"
        br="md"
        gap="xs"
        onPress={() => {
          // @ts-ignore
          navigation.navigate("actuality", {
            actuality,
          });
        }}
      >
        <Text text={formatDateFromToday(startDate ?? new Date(), "dd MMMM yyyy")} size="xs" color="grey400" />
        <Text size="lg" text={title} preset="bold" color="primary" />

        <XStack ai="center" jc="space-between" w={100}>
          {cover && <QuickImage width={120} height={120} source={{ uri: cover.url }} style={{ borderRadius: 16 }} />}
          {content && <Text text={content} />}
        </XStack>
      </YStack>
    </Stack>
  );
}

export default ActualityCard;
