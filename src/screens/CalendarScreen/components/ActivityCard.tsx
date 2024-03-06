import { Text } from "components/Text";
import { Stack, XStack, YStack } from "components/containers/Stack/Stack";

import { formatDateFromToday } from "utils/Date";

import { QuickImage } from "components/ImageComponent";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { createEditorJsViewer } from "editorjs-viewer-native";
import { ActivityItem } from "types/activity";
import { formatDate } from "utils/helper";

type ActivityCardProps = {
  activity: ActivityItem;
  navigation: NativeStackNavigationProp<MainStackParamList>; // Consider using a more specific type for navigation if possible
};

export function ActivityCard({ navigation, activity }: ActivityCardProps) {
  const { title, content, contentRTE, publishedAt, cover } = activity;

  return (
    <Stack br="xs" bc="backgroundCard" overflow="hidden">
      <YStack
        padding="md"
        br="md"
        gap="xs"
        onPress={() => {
          // @ts-ignore
          navigation.navigate("activity", {
            activity,
          });
        }}
      >
        <Text text={formatDate(publishedAt)} size="xs" color="grey400" />
        <Text size="lg" text={title} preset="bold" color="primary" />

        <XStack ai="center" jc="space-between" w={100}>
          {cover && <QuickImage width={120} height={120} source={{ uri: cover.url }} style={{ borderRadius: 16 }} />}
          {content && <Text text={content} />}
          {/* <AddressField coord={{ longitude: longitude, latitude: latitude }} format={"%city%, %state%"} /> */}

          {/* {contentRTE && <EditorJsViewerNative data={JSON.parse(contentRTE)} />} */}
        </XStack>
      </YStack>
    </Stack>
  );
}

export default ActivityCard;
