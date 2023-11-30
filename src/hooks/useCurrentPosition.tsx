import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Region } from "react-native-maps";
import { INITIAL_REGION } from "constants/global";

const useCurrentPosition = (): [Region | null, boolean] => {
  const [region, setRegion] = useState<Region | null>(null);
  const [isLocationFetched, setLocationFetched] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocationFetched(true);
    })();
  }, []);

  return [region, isLocationFetched];
};

export default useCurrentPosition;
