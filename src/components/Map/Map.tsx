import { Text } from "components/Text";
import { KM_PER_DEGREE_LATITUDE } from "constants/global";
import useCurrentPosition from "hooks/useCurrentPosition";
import MapView, { Marker, Region, Circle } from "react-native-maps";
import { color } from "theme";
import { ActivitiesData } from "types/activity";
import { hexToRGBA } from "utils/helper";

import { CustomMarker } from "./components/Marker";
import { MapPresets, presets } from "./map.presets";
import { useNavigation } from "@react-navigation/native";
import { LocationData } from "types/location";

//TODO: - Display fields on the map

interface MapProps {
  maxDistance: number;
  region: Region;
  initialRegion?: Region;
  style?: any;
  preset?: MapPresets;
  locations: LocationData;
  mapRef?: any;
  onRegionChangeComplete?: (newRegion: Region) => void; // Add this line
  navigation: any;
}

function MapComponent(props: MapProps) {
  const {
    preset = "default",
    region,
    onRegionChangeComplete,
    mapRef,
    locations,
    maxDistance,
    style,
    navigation,
    ...rest
  } = props;
  const styles = [presets[preset], style];

  const calculateRadius = (latitudeDelta: number): number => {
    // Convert latitudeDelta to kilometers (40% of the map's height)
    const deltaInKm = latitudeDelta * 0.4 * KM_PER_DEGREE_LATITUDE;
    return deltaInKm * 1000;
  };
  const radius = calculateRadius(region.latitudeDelta);

  return (
    <>
      <MapView
        style={styles}
        onRegionChangeComplete={onRegionChangeComplete}
        region={region}
        ref={mapRef}
        initialRegion={rest.initialRegion}
        {...rest}
      >
        {locations?.data &&
          locations.data.map((activity, index) => {
            const cloudinaryUrl = activity?.cover?.url;
            if (activity?.latitude !== null && activity?.longitude !== null) {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: activity.latitude,
                    longitude: activity.longitude,
                  }}
                  onPress={(e) => {
                    e.stopPropagation(),
                      navigation.navigate("activity", {
                        activity,
                      });
                  }}
                >
                  <CustomMarker image={cloudinaryUrl} type="activity" />
                </Marker>
              );
            }
          })}
      </MapView>
    </>
  );
}

export default MapComponent;
