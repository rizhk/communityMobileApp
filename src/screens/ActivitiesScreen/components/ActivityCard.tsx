import { Text } from "components/Text";
import { Stack, XStack, YStack } from "components/containers/Stack";
import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Line } from "react-native-svg";
import { color, palette, spacing } from "theme";
import { ActivityItemStrapi } from "types/activity";
import { fetchShortAddressFromCoords } from "utils/locationHelper";

interface ActivityCardProps {
  activity: ActivityItemStrapi;
}

const ActivityCard = ({
  activity,
  activity: {
    attributes: { date, latitude, longitude, sport, participants, maxParticipants },
  },
}: ActivityCardProps) => {
  const [address, setAddress] = useState("");
  const day = new Date(date).getDate();
  const month = new Date(date).toLocaleString("default", { month: "long" });
  const sportName = sport.data.attributes.name;
  const nbParticipants = participants.data.length;
  const icon = sport.data.attributes.icon.data.attributes.url;
  const nbmaxParticipants = maxParticipants === 999999 ? "∞" : maxParticipants;

  // console.log( icon :", icon);

  fetchShortAddressFromCoords({
    latitude,
    longitude,
  }).then((address) => setAddress(address));

  // return (
  //   <View style={styles.card}>
  //     <View style={styles.dateContainer}>
  //       <Image source={{uri : icon}} resizeMode="contain" style={styles.icon}/>

  //     </View>
  //     <View style={styles.detailsContainer}>
  //       <Text style={styles.title}>{sportName}</Text>
  //       <Text style={styles.location}>{address}</Text>
  //       <Text style={styles.participants}>
  //         {nbParticipants}/{nbmaxParticipants}
  //       </Text>
  //     </View>
  //   </View>
  // );



  return (
    <XStack h={100} bc="secondary" flexGrow br="md">
      <Stack  ai="center" jc="center" flex={0.2} w={200} bc={"grey300"}>
        <Image source={{uri : icon}} resizeMode="contain" style={styles.icon}/>
      </Stack>
      <YStack bc="grey500" jc="center" flex={0.8}>
          <Text text={sportName}/>
      </YStack>
      
    </XStack>
  )
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    // backgroundColor: "#000",
    marginBottom: 10,
    flex : 1,
    height : "100%",
    marginHorizontal : 10,
    backgroundColor : "blue",
    borderRadius: 6,
    paddingHorizontal : 5
  },
  dateContainer: {
    padding: 10,
    flex: 0.3,
    backgroundColor : "red",
    justifyContent: "center",
    alignItems: "center",
  },
  icon : {
    height : "100%",
    width: "100%",
  },
  day: {
    fontSize: 24,
    color: "#fff",
  },
  month: {
    fontSize: 16,
    color: "#fff",
  },
  detailsContainer: {
    padding: 10,
    flex:1,
    // backgroundColor : "green",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    color: "#fff",
  },
  location: {
    fontSize: 16,
    color: "#fff",
  },
  participants: {
    fontSize: 16,
    color: "#fff",
  },
});

export default ActivityCard;
