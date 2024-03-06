import { InfoData, InfoItem } from "types/info";
import { Text } from "components/Text";
import { Stack, XStack, YStack } from "components/containers/Stack/Stack";

import { formatDateFromToday } from "utils/Date";

import { QuickImage } from "components/ImageComponent";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { createEditorJsViewer } from "editorjs-viewer-native";
import Collapsible from "react-native-collapsible";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { is } from "ramda";

type InfoCardProps = {
  info: InfoItem;
  navigation: NativeStackNavigationProp<MainStackParamList>; // Consider using a more specific type for navigation if possible
};

function CollapsibleFunc({ children }: any) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  console.log(isCollapsed, "isCollapsed");
  return (
    <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
      <Collapsible
        // onPress={() => {
        //   setIsCollapsed(!isCollapsed);
        // }}
        collapsed={isCollapsed}
      >
        {children}
      </Collapsible>
    </TouchableOpacity>
  );
}

export function InfoCard({ navigation, info }: InfoCardProps) {
  const { title, contentRTE, cover } = info;

  const EditorJsViewerNative = createEditorJsViewer();

  return (
    <Stack br="xs" bc="backgroundCard" overflow="hidden">
      <YStack
        padding="md"
        br="md"
        gap="xs"
        // onPress={() => {
        //   setIsCollapsed(!isCollapsed);
        // }}
      >
        <Text size="lg" text={title} preset="bold" color="primary" />
        <CollapsibleFunc>
          <XStack ai="center" jc="space-between">
            {cover && <QuickImage width={120} height={120} source={{ uri: cover.url }} style={{ borderRadius: 16 }} />}
            <Text size="sm" text="du text" />
            {contentRTE && <EditorJsViewerNative data={JSON.parse(contentRTE)} />}
          </XStack>
        </CollapsibleFunc>
      </YStack>
    </Stack>
  );
}
