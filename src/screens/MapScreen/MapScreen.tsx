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
import { ActivityIndicator } from "react-native";
import { Region } from "react-native-maps";

export default function MapScreen() {
  //TODO: ADD setUserLocation
  const initialRegion = {
    latitude: 37.783333,
    longitude: -122.416667,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  //useState

  //useEffect

  /////FETCH
  const { data, error, isLoading } = useSWR("activities", () => fetchActivities());
  // fetchFields();
  // fetchTournaments();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>error...</Text>;
  }

  return (
    <MainLayout>
      <MapComponent activities={data} initialRegion={initialRegion} />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "50%",
  },
});
