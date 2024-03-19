import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "components/Button";
import { Stack, YStack } from "components/containers";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { ActivityIndicator, Image, ImageStyle, SafeAreaView, StyleProp, View } from "react-native";
import { Text } from "components/Text";
import { LeftArrow } from "assets/svg";
import AddressField from "components/AddressField";
import { formatDateFromToday } from "utils/Date";
import { ScrollView } from "react-native-gesture-handler";
import { useDistance } from "hooks/useDistance";
import { LocationMapType } from "types/global";
import AvatarSlider, { AvatarUser } from "components/Avatar/AvatarSlider";
import { ActivityItem } from "types/activity";
import { UserItem } from "types/user";

type Props = NativeStackScreenProps<MainStackParamList, "activity">;

export function ActivityScreen({ navigation, route }: Props) {
  const { startDate, content }: ActivityItem = route.params.activity;

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

          <YStack h={150} jc="space-evenly"></YStack>
          <Stack h={1} bc="grey600"></Stack>

          {content && (
            <YStack mt={10}>
              <Text preset="bold" size="md" style={{ marginBottom: 10 }} text="Info : " />
              <Text style={{ marginBottom: 10 }} color="dim" text={content} />
              <Stack h={1} bc="grey600"></Stack>
            </YStack>
          )}
          {/* TODO ajouter logique */}
          <Stack ai="center" h={40} jc="center">
            <Text color="error" text="Supprimé l'activité" />
          </Stack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

const iconStyle = {
  height: 180,
  width: 180,
} as StyleProp<ImageStyle>;
