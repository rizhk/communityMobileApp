import { fetchAPIqs } from "api/request";
import { Button } from "components/Button";
import MapComponent from "components/Map/Map";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import { fetchActivities } from "api/api";
import useSWR from "swr";
import { Text } from "components/Text";
import { MainLayout } from "layouts";

export default function MapScreen() {
  //useState

  //useEffect / FetchData / useQuery
  //FetchActivities

  const { data, error, isLoading } = useQuery("activities", () => fetchActivities());
  const {
    data: dataSwr,
    error: errorSwr,
    isLoading: isLoadingSwr,
  } = useSWR("activities", () => fetchActivities());

  // console.log("data", data);
  console.log("dataSwr", dataSwr);

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
    <MainLayout>
      <Text>MapScreen</Text>
      <MapComponent preset="small" style={styles.map} initialRegion={initialRegion} />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "50%",
  },
});
