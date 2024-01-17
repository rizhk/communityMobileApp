import { Text } from "components/Text";
import { Stack, XStack, YStack } from "components/containers/Stack/Stack";
import { useState } from "react";
import { Image, ImageBackground, StyleProp, ImageStyle } from "react-native";
import { color } from "theme";
import { INFINIT_PARTICIPANTS } from "constants/global";
import { ActivityItem } from "types/activity";
import { User } from "assets/svg";
import { formatDateFromToday } from "utils/Date";
import AddressField from "components/AddressField";
import { useNavigation } from "@react-navigation/native";
import { SportItem } from "types/sport";
import { UserItem } from "types/user";

type ActivityCardProps = {
  activity: ActivityItem;
};

const ActivityCard = ({
  activity,
  activity: {
     latitude, longitude, sport, participants, maxParticipants, date
  },
}: ActivityCardProps) => {

  const nbmaxParticipants = maxParticipants === INFINIT_PARTICIPANTS ? "∞" : maxParticipants;
  const [formatDate, setFormatDate] = useState("");
  const textSize = formatDate.length > 6 ? "md" : "lg";
  const navigation = useNavigation();

  return (
    <Stack h={90} br="xs" bc="backgroundLight" overflow="hidden">
      <ImageBackground source={require("assets/image/tileCard/1.png")}>
        <XStack pa="xxs" br="md" gap="xs"  onPress={() => {
                    navigation.navigate("activity", {
                      activity,
                    });
                }}>
          <YStack ai="center" jc="space-between" w={100}>
            <Image source={{ uri: sport.icon.url }} resizeMode="contain" style={iconStyle} />
            <Text text={formatDateFromToday(date, "dd MMM")} preset="bold" color="primary" size={textSize} />
          </YStack>
          <YStack flexGrow jc="space-around">
            <Text text={sport.name} preset="bold" size="xl" />
            <AddressField coord={{ longitude: longitude, latitude: latitude }} format={"%city%, %state%"} />
            <XStack w="100%" gap="xs">
              <User color={color.white} />
              <Text text={`${participants.length} / ${nbmaxParticipants}`} preset="bold" size="xs" />
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
