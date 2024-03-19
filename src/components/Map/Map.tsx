import { KM_PER_DEGREE_LATITUDE } from "constants/global";

import MapView, { Marker, Region, Circle } from "react-native-maps";

import { MapPresets, presets } from "./map.presets";

import { LocationsData, LocationItem, LocationType } from "types/location";
import { IncidentData } from "types/incident";

import { InfoPanel } from "./components/InfoPanel";
import { StyleSheet, View } from "react-native";

import { color } from "theme";

import { IconForType } from "components/Images/IconType";

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

  return (
    <>
      <MapView
        style={styles}
        onRegionChangeComplete={onRegionChangeComplete}
        region={region}
        ref={mapRef}
        tintColor="#fff"
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
                  >
                    <View style={iconStyles.container}>
                      <IconForType type={location.type} color={color.primaryLight} />
                    </View>

                    {/* <CustomMarker image={cloudinaryUrl} type="location" /> */}
                    <InfoPanel style={{ width: 272 }} location={location} />
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

const iconStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.primary,
    borderRadius: 75,
    padding: 8,
  },
  // Additional styling if needed
});
