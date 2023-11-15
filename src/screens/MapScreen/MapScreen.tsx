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

  const { data, error, isLoading } = useSWR("activities", () => fetchActivities());

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

  if (error) {
    return <Text>error...</Text>;
  }

  return (
    <MainLayout>
      <MapComponent initialRegion={initialRegion} />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "50%",
  },
});
