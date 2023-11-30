import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Region } from "react-native-maps";

const useCurrentPosition = (
  initialRegion: Region
): [Region, React.Dispatch<React.SetStateAction<Region>>, boolean] => {
  const [region, setRegion] = useState<Region>(initialRegion);
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
        ...initialRegion,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocationFetched(true);
    })();
  }, []);

  return [region, setRegion, isLocationFetched];
};

export default useCurrentPosition;
