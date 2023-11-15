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
  const INITIAL_REGION = {
    latitude: 46.806,
    longitude: 7.153,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
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
      <MapComponent activities={data} initialRegion={INITIAL_REGION} />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "50%",
  },
});
