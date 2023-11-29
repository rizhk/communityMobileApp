import { fetchAPIqs } from "api/request";
import { Button } from "components/Button";
import MapComponent from "components/Map/Map";
import { useEffect, useState, useCallback } from "react";
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

export default function MapScreen() {
  const [region, setRegion] = useState<Region>(INITIAL_REGION);

  const filters = {
    sport: {
      name: "Basketball",
    },
    // date: "2023-07-19",
  };

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

  // Callback for when the region changes
  const handleRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
  };

  console.log(region, "region");

  const handleRefetch = () => {
    console.log("icii");
    mutate();
  };

  const ShowRefetchButton = () => {
    return (
      <View>
        <Button
          onPress={() => {
            handleRefetch();
          }}
          text="Refetch"
        />
      </View>
    );
  };

  const regionKey = JSON.stringify(region);

  const { data, error, isLoading, mutate } = useSWR("activities", () =>
    fetchActivitiesByRegion(region, 50000, filters)
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
        key={region.latitude + region.longitude}
        activities={data}
        initialRegion={region}
        // region={region}
        // onRegionChangeComplete={handleRegionChangeComplete}
      />
    </MainLayout>
  );
}
