import { fetchAPIqs } from "api/request";
import { Button } from "components/Button";
import MapComponent from "components/Map/Map";
import { useEffect, useState } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useQuery } from "react-query";
import { fetchActivities } from "api/api";
import useSWR from "swr";

import { MainLayout } from "layouts";
import { ActivityIndicator } from "react-native";
import { Region } from "react-native-maps";
import { Text } from "components/Text";
import { shadow, color } from "theme";
import * as Location from "expo-location";

export default function MapScreen() {
  const INITIAL_REGION = {
    latitude: 46.806,
    longitude: 7.153,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  //TODO: Center Map on User location if available or INITIAL_REGION
  const [region, setRegion] = useState<Region>(INITIAL_REGION);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  console.log(region, "region");

  /////FETCH
  const { data, error, isLoading } = useSWR("activities", () => fetchActivities());

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>error...</Text>;
  }

  return (
    <MainLayout>
      <MapComponent key={region.latitude + region.longitude} activities={data} initialRegion={region} />
    </MainLayout>
  );
}
