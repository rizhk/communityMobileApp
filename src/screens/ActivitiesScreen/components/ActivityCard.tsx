import { Text } from "components/Text";
import {  XStack, YStack } from "components/containers/Stack";
import { format, isToday, isTomorrow } from "date-fns";
import { useEffect, useState } from "react";
import { View, StyleSheet, Image, ImageBackground } from "react-native";
import Svg, { Path } from "react-native-svg";
import { color, spacing } from "theme";
import { ActivityItemStrapi } from "types/activity";
import { fetchShortAddressFromCoords } from "utils/locationHelper";

const logoIcon = "M-548.5-413.5a21.2,21.2,0,0,1,21.2-21.2,21.2,21.2,0,0,1,21.2,21.2,21.2,21.2,0,0,1-21.2,21.2h0v19.7C-540.131-384.143-549.187-397.011-548.5-413.5Z";
//TODO Change for user icon
const userIcon = "M-548.5-413.5a21.2,21.2,0,0,1,21.2-21.2,21.2,21.2,0,0,1,21.2,21.2,21.2,21.2,0,0,1-21.2,21.2h0v19.7C-540.131-384.143-549.187-397.011-548.5-413.5Z";

interface ActivityCardProps {
  activity: ActivityItemStrapi;
}

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
  const sportName = sport.data.attributes.name;
  const nbParticipants = participants.data.length;
  const icon = sport.data.attributes.icon.data.attributes.url;
  const nbmaxParticipants = maxParticipants === 99999 ? "∞" : maxParticipants;
  const [formatDate, setFormatDate] = useState("");
  const textSize = formatDate.length > 6 ? 'md' : 'lg';
  
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
  
  useEffect(() => {
    const formatDate = new Date(date);

    if (isToday(formatDate))
      setFormatDate("Today");
    else if (isTomorrow(formatDate))
      setFormatDate("Tomorow")
    else
      setFormatDate(format(formatDate, "dd MMM"));
  }, [date]);
  

  return (
    <View style={styles.bgContainer}>
      <ImageBackground  source={require("assets/image/tileCard/1.png")}>
        <XStack  pa="xxs" br="md" gap="xs">
          <YStack  ai="center" jc="space-between" w={100} >
            <Image source={{uri : icon}} resizeMode="contain" style={styles.icon} />
              <Text text={formatDate} preset="bold" color="primary" size={textSize}/>
          </YStack>
          <YStack  flexGrow jc="space-around">
            <Text text={sportName} preset="bold" size="xl"/>
            <XStack w="100%"  gap="xxs" >
              <SvgIcon d={logoIcon} color={color.white} h="100%" w="5%"/>
              <Text text={address?.town} size="xs" />
            </XStack>
            <XStack w="100%" gap="xxs">
              <SvgIcon d={userIcon} color={color.white} h="100%" w="5%"/>
              <Text text={`${nbParticipants} / ${nbmaxParticipants}`} preset="bold" size="xs"/>
            </XStack>
          </YStack>
        </XStack>
      </ImageBackground>
    </View>
  )
};

export default ActivityCard;


type svgIconProps = {
  color : string;
  d : string;
  w : string;
  h : string;
}

function SvgIcon ({ color, d, w, h } : svgIconProps) {

  return (
    <Svg width={w} height={h} viewBox="0 0 60.435 80.101">
      <Path
        d={d}
        transform="translate(557.54 443.7)"
        fill={color}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon : {
    height : "65%",
    width: "65%"

  },
  bgContainer: {
    borderRadius: spacing.xs,
    overflow: 'hidden',
    height:90,
    backgroundColor: color.backgroundLight
  }
});