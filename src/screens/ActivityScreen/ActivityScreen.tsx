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
import { LocationType } from "types/global";
import AvatarSlider, { AvatarUser } from "components/Avatar/AvatarSlider";
import { ActivityItem } from "types/activity";

type Props = NativeStackScreenProps<MainStackParamList, "activity">;

export function ActivityScreen({ navigation, route }: Props) {
  const { latitude, longitude, sport, participants, maxParticipants, date, description, author }: ActivityItem =
    route.params.activity;
  const avatarUser: AvatarUser[] = participants?.map((participant: any) => ({
    id: participant.id,
    url: participant?.avatar?.url,
    name: participant?.firstName,
  }));
  const hour = {
    start: "12:00",
    end: "14:00",
  };
  const coord: LocationType = {
    longitude: longitude,
    latitude: latitude,
  };
  const distance = useDistance(coord);
  // console.log("activity : ", participants[0])

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
          <Stack jc="center" ai="center" h={200}>
            <Image source={{ uri: sport.icon.url }} resizeMode="contain" style={iconStyle} />
          </Stack>
          <YStack h={150} jc="space-evenly">
            <YStack jc="center">
              <Text size="xl" preset="bold">
                {sport.name}
              </Text>
              <AddressField
                textProps={{ size: "sm" }}
                coord={coord}
                format={"%city% (%state%), %street% %streetNb%"}
                color="white"
              />
              {distance ? (
                <Text>{distance}</Text>
              ) : (
                <Stack ai="flex-start">
                  <ActivityIndicator animating={true} hidesWhenStopped={true} />
                </Stack>
              )}
            </YStack>
            <YStack jc="center">
              <Text color="primary" preset="bold">
                {formatDateFromToday(date, "dd MMMM yyy")}
              </Text>
              <Text color="primary">
                {hour.start} - {hour.end}
              </Text>
            </YStack>
          </YStack>
          <Stack h={1} bc="grey600"></Stack>
          {participants.length > 0 && (
            <YStack h={140} jc="space-evenly">
              <Text preset="bold" size="md">
                {participants.length} Participant.e.s
              </Text>
              <AvatarSlider users={avatarUser} />
              <Stack h={1} bc="grey600"></Stack>
            </YStack>
          )}
          {description && (
            <YStack mt={10}>
              <Text preset="bold" size="md" style={{ marginBottom: 10 }} text="Info : " />
              <Text style={{ marginBottom: 10 }} color="dim" text={description} />
              <Stack h={1} bc="grey600"></Stack>
            </YStack>
          )}
          {/* TODO ajouter logique */}
          <Stack ai="center" h={40} jc="center">
            <Text color="error" text="Supprimé l'activité" />
          </Stack>
        </YStack>
      </ScrollView>
      {/* TODO ajouter logique */}
      <Stack pa="md">
        <Button text="Participer" />
      </Stack>
    </SafeAreaView>
  );
}

const iconStyle = {
  height: 180,
  width: 180,
} as StyleProp<ImageStyle>;
