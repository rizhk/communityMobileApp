import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "components/Button";
import { Stack, XStack, YStack } from "components/containers";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { ImageStyle, SafeAreaView, StyleProp, ScrollView, useWindowDimensions } from "react-native";
import { Text } from "components/Text";
import { LeftArrow } from "assets/svg";

import { LocationItem } from "types/location";
import { formatDate } from "utils/helper";
import EditorJsParser from "components/EditorJsParser";
import RenderHTML from "react-native-render-html";
import { IconForType } from "components/Images/IconType";

type Props = NativeStackScreenProps<MainStackParamList, "location">;

export function LocationScreen({ navigation, route }: Props) {
  const { title, contentRTE, contentQuill, publishedAt, type }: LocationItem = route.params.location as LocationItem;
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView>
      <ScrollView>
        <YStack jc="space-evenly">
          <YStack jc="center">
            <XStack jc="space-between" ai="center">
              <IconForType type={type} color="white" />
              <Text text={formatDate(publishedAt)} size="xs" color="grey400" />
            </XStack>
            <Text color="primary" size="lg" preset="bold">
              {title}
            </Text>
            {contentRTE && <EditorJsParser content={contentRTE} />}
            {contentQuill && <RenderHTML contentWidth={width} source={{ html: contentQuill }} />}
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

const iconStyle = {
  height: 180,
  width: 180,
} as StyleProp<ImageStyle>;
