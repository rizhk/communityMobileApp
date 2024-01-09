import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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
  const nbmaxParticipants = maxParticipants === 999999 ? "∞" : maxParticipants;

  fetchShortAddressFromCoords({
    latitude,
    longitude,
  }).then((address) => setAddress(address));

  return (
    <View style={styles.card}>
      <View style={styles.dateContainer}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.month}>{month}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{sportName}</Text>
        <Text style={styles.location}>{address}</Text>
        <Text style={styles.participants}>
          {nbParticipants}/{nbmaxParticipants}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#000",
    marginBottom: 10,
    borderRadius: 6,
  },
  dateContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
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
