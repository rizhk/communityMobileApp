import { Text } from "components/Text";
import { Stack, XStack, YStack } from "components/containers/Stack/Stack";
import { useState } from "react";
import { Image, ImageBackground, StyleProp, ImageStyle } from "react-native";
import { color } from "theme";
import { INFINIT_PARTICIPANTS } from "constants/global";
import { ActivityItemStrapi } from "types/activity";
import { User } from "assets/svg";
import { formatDateFromToday } from "utils/Date";
import AddressField from "components/AddressField";
import { useNavigation } from "@react-navigation/native";

type ActivityCardProps = {
  activity: ActivityItemStrapi;
};

const ActivityCard = ({activity} : ActivityCardProps) => {
  //TODO to change
  const sportName = activity.attributes.sport.data.attributes.name;
  const nbParticipants = activity.attributes.participants.data.length;
  const icon = activity.attributes.sport.data.attributes.icon.data.attributes.url;
  const date = activity.attributes.date
  const nbmaxParticipants = activity.attributes.maxParticipants === INFINIT_PARTICIPANTS ? "∞" : activity.attributes.maxParticipants;
  const [formatDate, setFormatDate] = useState("");
  const textSize = formatDate.length > 6 ? "md" : "lg";
  const navigation = useNavigation();
  const longitude = activity.attributes.longitude;
  const latitude = activity.attributes.latitude;

  return (
    <Stack h={90} br="xs" bc="backgroundLight" overflow="hidden">
      <ImageBackground source={require("assets/image/tileCard/1.png")}>
        <XStack pa="xxs" br="md" gap="xs"  onPress={() => {
                    navigation.navigate("activity", {
                      activity,
                    });
                }}>
          <YStack ai="center" jc="space-between" w={100}>
            <Image source={{ uri: icon }} resizeMode="contain" style={iconStyle} />
            <Text text={formatDateFromToday(date, "dd MMM")} preset="bold" color="primary" size={textSize} />
          </YStack>
          <YStack flexGrow jc="space-around">
            <Text text={sportName} preset="bold" size="xl" />
            <AddressField coord={{ longitude: longitude, latitude: latitude }} format={"%city%, %state%"} />
            <XStack w="100%" gap="xs">
              <User color={color.white} />
              <Text text={`${nbParticipants} / ${nbmaxParticipants}`} preset="bold" size="xs" />
            </XStack>
          </YStack>
        </XStack>
      </ImageBackground>
    </Stack>
  );
};

export default ActivityCard;

const iconStyle = {
  height: "65%",
  width: "65%",
} as StyleProp<ImageStyle>;
