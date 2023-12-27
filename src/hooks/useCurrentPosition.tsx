import { INITIAL_REGION_BOUT_DU_MONDE } from "constants/global";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { Region } from "react-native-maps";

const useCurrentPosition = (): [Region, boolean] => {
  const [region, setRegion] = useState<Region>(INITIAL_REGION_BOUT_DU_MONDE);
  const [isLocationFetched, setLocationFetched] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        setLocationFetched(true); // Permission denied, using initial region
        return;
      }

      console.log("Permission to access location was granted");
      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocationFetched(true); // Location fetched
    })();
  }, []);

  return [region, isLocationFetched];
};

export default useCurrentPosition;
