import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ActivityCardProps {
  activity: any;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  console.log(activity, "activity");
  const inputDate = activity.attributes.date;
  const day = new Date(inputDate).getDate();
  const month = new Date(inputDate).toLocaleString("default", { month: "long" });
  const sport = activity.attributes.sport.data.attributes.name;
  const location = activity.attributes.location;
  const maxParticipants = activity.attributes.maxParticipants;
  console.log(day, "day2");
  console.log(month, "month");
  return (
    <View style={styles.card}>
      <View style={styles.dateContainer}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.month}>{month}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{sport}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.participants}>14/{maxParticipants}</Text>
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
