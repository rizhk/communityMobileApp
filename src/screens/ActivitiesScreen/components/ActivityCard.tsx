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

type ActivityCardProps = {
  activity: ActivityItemStrapi;
};

const ActivityCard = ({
  activity: {
    attributes: { date, latitude, longitude, sport, participants, maxParticipants },
  },
}: ActivityCardProps) => {
  //TODO to change
  const sportName = sport.data.attributes.name;
  const nbParticipants = participants.data.length;
  const icon = sport.data.attributes.icon.data.attributes.url;

  const nbmaxParticipants = maxParticipants === INFINIT_PARTICIPANTS ? "∞" : maxParticipants;
  const [formatDate, setFormatDate] = useState("");
  const textSize = formatDate.length > 6 ? "md" : "lg";

  return (
    <Stack h={90} br="xs" bc="backgroundLight" overflow="hidden">
      <ImageBackground source={require("assets/image/tileCard/1.png")}>
        <XStack pa="xxs" br="md" gap="xs">
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
