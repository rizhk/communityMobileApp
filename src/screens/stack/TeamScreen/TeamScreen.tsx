import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "components/Button";
import { Stack, YStack } from "components/containers";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "components/Text";
import { LeftArrow } from "assets/svg";

import { TeamItem } from "types/official";

type Props = NativeStackScreenProps<MainStackParamList, "team">;

export function TeamScreen({ navigation, route }: Props) {
  const { content }: TeamItem = route.params.team;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack flex={1} pa={"md"}>
          <YStack h={150} jc="space-evenly"></YStack>
          <Stack h={1} bc="grey600"></Stack>
          <Text preset="bold" size="md" style={{ marginBottom: 10 }} text="Info : " />

          {content && (
            <YStack mt={10}>
              <Text preset="bold" size="md" style={{ marginBottom: 10 }} text="Info : " />
              <Text style={{ marginBottom: 10 }} color="dim" text={content} />
              <Stack h={1} bc="grey600"></Stack>
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
