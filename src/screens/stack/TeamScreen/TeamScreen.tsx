import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "components/Button";
import { Stack, XStack, YStack } from "components/containers";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "components/Text";
import { LeftArrow } from "assets/svg";

import { TeamItem } from "types/official";
import { IconForType } from "components/Images/IconType";

type Props = NativeStackScreenProps<MainStackParamList, "team">;

export function TeamScreen({ navigation, route }: Props) {
  const { title }: TeamItem = route.params.team;

  return (
    <SafeAreaView>
      <ScrollView>
        <YStack jc="space-evenly">
          <YStack jc="center">
            <Text color="primary" size="lg" preset="bold">
              {title}
            </Text>
            {/* <Text text={formatDate(startDate)} size="xs" color="grey400" />
            {endDate && <Text text={` - ${formatDate(endDate)}`} size="xs" color="grey400" />}
            {contentRTE && <EditorJsParser content={contentRTE} />}
            {contentQuill && <RenderHTML contentWidth={width} source={{ html: contentQuill }} />} */}
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
