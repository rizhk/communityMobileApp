import { InfoData, InfoItem } from "types/info";
import { Text } from "components/Text";
import { Stack, XStack, YStack } from "components/containers/Stack/Stack";

import { formatDateFromToday } from "utils/Date";

import { QuickImage } from "components/ImageComponent";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { createEditorJsViewer } from "editorjs-viewer-native";

type InfoCardProps = {
  info: InfoItem;
  navigation: NativeStackNavigationProp<MainStackParamList>; // Consider using a more specific type for navigation if possible
};

export function InfoCard({ navigation, info }: InfoCardProps) {
  const { title, contentRTE, startDate, cover } = info;

  const EditorJsViewerNative = createEditorJsViewer();

  return (
    <Stack br="xs" bc="backgroundCard" overflow="hidden">
      <YStack
        padding="md"
        br="md"
        gap="xs"
        onPress={() => {
          // navigation.navigate("info", {
          //   info,
          // });
        }}
      >
        {/* <Text text={formatDateFromToday(startDate ?? new Date(), "dd MMM")} size="xs" color="grey400" /> */}
        <Text size="lg" text={title} preset="bold" color="primary" />

        <XStack ai="center" jc="space-between">
          {cover && <QuickImage width={120} height={120} source={{ uri: cover.url }} style={{ borderRadius: 16 }} />}

          {contentRTE && <EditorJsViewerNative data={JSON.parse(contentRTE)} />}
        </XStack>
      </YStack>
    </Stack>
  );
}
