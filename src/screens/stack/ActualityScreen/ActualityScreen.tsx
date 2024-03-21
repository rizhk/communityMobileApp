import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "components/Button";
import { Stack, YStack } from "components/containers";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { ImageStyle, SafeAreaView, StyleProp, Touchable, TouchableOpacity, View } from "react-native";
import { Text } from "components/Text";
import { LeftArrow } from "assets/svg";

import { formatDateFromToday } from "utils/Date";
import { ScrollView } from "react-native-gesture-handler";

import { UserItem } from "types/user";
import { ActualityItem } from "types/actuality";
import CustomScreen from "components/CustomScreen";
import { createEditorJsViewer } from "editorjs-viewer-native";
import EditorJsParser from "components/EditorJsParser";
import { formatDate } from "utils/helper";

type Props = NativeStackScreenProps<MainStackParamList, "actuality">;

export function ActualityScreen({ navigation, route }: Props) {
  const { content, title, contentRTE, publishedAt }: ActualityItem = route.params.actuality;

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

      {content && (
        <YStack mt={10}>
          <Text preset="bold" size="md" style={{ marginBottom: 10 }} text="Info : " />
          <Text style={{ marginBottom: 10 }} color="dim" text={content} />
          <Stack h={1} bc="grey600"></Stack>
        </YStack>
      )}
    </SafeAreaView>
  );
}
