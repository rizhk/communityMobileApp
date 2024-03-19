import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "components/Button";
import { Stack, YStack } from "components/containers";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { ImageStyle, SafeAreaView, StyleProp, ScrollView } from "react-native";
import { Text } from "components/Text";
import { LeftArrow } from "assets/svg";

import { LocationItem } from "types/location";

type Props = NativeStackScreenProps<MainStackParamList, "location">;

export function LocationScreen({ navigation, route }: Props) {
  const { content }: LocationItem = route.params.location as LocationItem;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack flex={1} pa={"md"}>
          <Button
            icon={LeftArrow}
            iconScale={3}
            rounded
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Stack h={1} bc="grey600"></Stack>

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

const iconStyle = {
  height: 180,
  width: 180,
} as StyleProp<ImageStyle>;
