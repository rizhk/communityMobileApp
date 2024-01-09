import { Text } from "components/Text";
import {  Stack, XStack, YStack } from "components/containers/Stack/Stack";
import { format, isToday, isTomorrow } from "date-fns";
import { useEffect, useState } from "react";
import { View, StyleSheet, Image, ImageBackground, StyleProp, ImageStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import { color, palette, spacing } from "theme";
import { INFINIT_PARTICIPANTS } from "constants/global";
import { ActivityItemStrapi } from "types/activity";
import { fetchShortAddressFromCoords } from "utils/locationHelper";
import { Pin, User } from "assets/svg";
import { formatDateFromToday } from "utils/Date";
import { StackStyleProps } from "components/containers/Stack/Stack.helper";

type ActivityCardProps = {
  activity: ActivityItemStrapi;
}

// Dans dossier type
type addr = {
  road : string;
  town : string;
}

const ActivityCard = ({
  activity: {
    attributes: { date, latitude, longitude, sport, participants, maxParticipants },
  },
}: ActivityCardProps) => {
  const [address, setAddress] = useState<addr | null>(null);

  console.log("saltu");

  //TODO to change
  const sportName = sport.data.attributes.name;
  const nbParticipants = participants.data.length;
  const icon = sport.data.attributes.icon.data.attributes.url;

  const nbmaxParticipants = maxParticipants ===  INFINIT_PARTICIPANTS ? "∞" : maxParticipants;
  const [formatDate, setFormatDate] = useState("");
  const textSize = formatDate.length > 6 ? 'md' : 'lg';
  

  // créer un hook
  useEffect(() => {
    fetchShortAddressFromCoords({
      latitude,
      longitude,
    })
    .then((address) => {
      const splitted = address.split(', ');
      setAddress({
        road: splitted[0],
        town: splitted[1],
      });
    })
    .catch((error) => {
      console.error("Fetching Error <ActivityCard> :", error);
    });
  }, [latitude, longitude])

  return (
    <Stack h={90} br="xs" bc="backgroundLight" overflow="hidden">
      <ImageBackground  source={require("assets/image/tileCard/1.png")}>
        <XStack  pa="xxs" br="md" gap="xs">
          <YStack  ai="center" jc="space-between" w={100} >
            <Image source={{uri : icon}} resizeMode="contain" style={iconStyle} />
              <Text text={formatDateFromToday(date, "dd MMM")} preset="bold" color="primary" size={textSize}/>
          </YStack>
          <YStack  flexGrow jc="space-around">
            <Text text={sportName} preset="bold" size="xl"/>
            <XStack w="100%"  gap="xxs" >
              <Pin color={color.primary}/>
              <Text text={address?.town} size="xs" />
            </XStack>
            <XStack w="100%" gap="xxs">
              <User color={color.white}/>
              <Text text={`${nbParticipants} / ${nbmaxParticipants}`} preset="bold" size="xs"/>
            </XStack>
          </YStack>
        </XStack>
      </ImageBackground>
    </Stack>
  )
};

export default ActivityCard;

const iconStyle = {
    height : "65%",
    width: "65%"
} as StyleProp<ImageStyle>; 