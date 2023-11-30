import { fetchAPIqs } from "api/request";
import { Button } from "components/Button";
import MapComponent from "components/Map/Map";
import { useEffect, useState, useRef } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useQuery } from "react-query";
import { fetchActivitiesByRegion } from "api/api";
import useSWR from "swr";

import { MainLayout } from "layouts";
import { ActivityIndicator } from "react-native";
import { Region } from "react-native-maps";
import { Text } from "components/Text";
import { shadow, color } from "theme";
import * as Location from "expo-location";
import { INITIAL_REGION } from "constants/global";
import MapView from "react-native-maps";
import useCurrentPosition from "hooks/useCurrentPosition";
import { is } from "date-fns/locale";

export default function MapScreen() {
  // const [region, setRegion] = useState<Region>(INITIAL_REGION);

  const [region, setRegion, isLocationFetched] = useCurrentPosition(INITIAL_REGION); // Add this line]
  const [maxDistance, setMaxDistance] = useState(30000); // 30km
  console.log(isLocationFetched, "isLocationFetched");
  console.log(region, "region");

  const mapRef = useRef<MapView>(null);

  const filters = {
    sport: {
      name: "Basketball",
    },
    // date: "2023-07-19",
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(region);
    }
  }, [region]);

  const handleRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
  };

  const handleRefetch = () => {
    mutate("activities"); // Force a revalidation
  };

  //TODO: Better styling and way to show refetch button
  const ShowRefetchButton = () => {
    return (
      <View style={{ position: "absolute", top: 0, left: 0, zIndex: 100 }}>
        <Button onPress={handleRefetch} text="Refetch" />
      </View>
    );
  };

  //TODO: Add clusters to map

  const { data, error, isLoading, mutate } = useSWR(["activities"], () =>
    fetchActivitiesByRegion(region, maxDistance, filters)
  );

  // console.log(data, "data");
  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }

  if (error) {
    return <Text>error...</Text>;
  }

  return (
    <MainLayout>
      <ShowRefetchButton />
      <MapComponent
        maxDistance={maxDistance}
        mapRef={mapRef}
        activities={data}
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
      />
    </MainLayout>
  );
}
