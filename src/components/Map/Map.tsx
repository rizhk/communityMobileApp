import { Text } from "components/Text";
import { KM_PER_DEGREE_LATITUDE } from "constants/global";
import useCurrentPosition from "hooks/useCurrentPosition";
import MapView, { Marker, Region, Circle } from "react-native-maps";

import { CustomMarker } from "./components/Marker";
import { MapPresets, presets } from "./map.presets";

import { LocationsData, LocationItem } from "types/location";
import { IncidentData } from "types/incident";
import { useState } from "react";
import { InfoPanel } from "./components/InfoPanel";
import { View } from "react-native";

//TODO: - Display fields on the map

interface MapProps {
  maxDistance: number;
  region: Region;
  initialRegion?: Region;
  style?: any;
  preset?: MapPresets;
  locations?: LocationsData;
  incidents?: IncidentData;
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

  const [selectedLocation, setSelectedLocation] = useState<LocationItem | undefined>();

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
          locations.data.map((location, index) => {
            const cloudinaryUrl = location?.cover?.url;

            if (location?.latitude !== null && location?.longitude !== null) {
              return (
                <View key={index}>
                  <Marker
                    coordinate={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }}
                    onPress={() => {
                      setSelectedLocation(location);
                    }}
                    // onPress={(e) => {
                    //   e.stopPropagation(),
                    //     navigation.navigate("location", {
                    //       location,
                    //     });
                    // }}
                  >
                    {/* <CustomMarker image={cloudinaryUrl} type="location" /> */}
                    {selectedLocation && <InfoPanel location={selectedLocation} />}
                  </Marker>
                </View>
              );
            }
          })}
      </MapView>
    </>
  );
}

export default MapComponent;
