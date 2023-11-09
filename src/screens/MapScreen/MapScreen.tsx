import { fetchAPIqs } from "api/request";
import { Button } from "components/Button";
import MapComponent from "components/Map/Map";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useQuery } from "react-query";
import axios from "axios";
import { fetchActivities } from "api/api";

export default function MapScreen() {
  //useState

  //useEffect / FetchData / useQuery
  //FetchActivities

  const { data, error, isLoading } = useQuery("activities", () => fetchActivities());
  console.log("data", data);

  const initialRegion = {
    latitude: 37.783333,
    longitude: -122.416667,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      {/* <Button size="md" color="primary" preset="outlined" text="Hello" /> */}
      <MapComponent preset="small" style={styles.map} initialRegion={initialRegion} />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "50%",
  },
});
