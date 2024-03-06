import { Text } from "components/Text";
import { KM_PER_DEGREE_LATITUDE } from "constants/global";
import useCurrentPosition from "hooks/useCurrentPosition";
import MapView, { Marker, Region, Circle } from "react-native-maps";

import { CustomMarker } from "./components/Marker";
import { MapPresets, presets } from "./map.presets";

import { LocationsData, LocationItem, LocationType } from "types/location";
import { IncidentData } from "types/incident";
import { useState } from "react";
import { InfoPanel } from "./components/InfoPanel";
import { StyleSheet, View } from "react-native";
import {
  AlertTriangle,
  Building,
  Building2,
  Church,
  Dumbbell,
  HeartPulse,
  Pin,
  Rainbow,
  Theater,
  Warehouse,
} from "lucide-react-native";
import { color } from "theme";
import { LocationMapType } from "types/global";

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

  const [selectedLocation, setSelectedLocation] = useState<LocationItem | undefined>();

  const getIconForLocationType = (type: LocationType) => {
    switch (type) {
      case "Sportif":
        return <Dumbbell color="white" size={24} />;
      case "Salle":
        return <Warehouse color="white" size={24} />;
      case "Administration":
        return <Building color="white" size={24} />;
      case "Incident":
        return <AlertTriangle color="white" size={24} />;
      case "Santé":
        return <HeartPulse color="white" size={24} />;
      case "Culture":
        return <Theater color="white" size={24} />;
      case "Religion":
        return <Church color="white" size={24} />;
      case "Divers":
        return <Rainbow color="white" size={24} />;
      default:
        return null; // ou une icône par défaut si vous en avez une
    }
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

            {
              /* <FolderArchive color="red" size={48} />
            <AlertTriangle color="red" size={48} />
            <Church color="red" size={48} />
            <HeartPulse color="red" size={48} />
            <Dumbbell color="red" size={48} />
            <Theater color="red" size={48} />
            <Warehouse color="red" size={48} /> */
            }

            if (location?.latitude !== null && location?.longitude !== null) {
              return (
                <View key={index}>
                  <Marker
                    coordinate={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }}
                    // style={{ width: 36, height: 36 }}
                    // onPress={() => {
                    //   setSelectedLocation(location);
                    // }}
                  >
                    <View style={iconStyles.container}>
                      {getIconForLocationType(location.type)}
                      {/* <Warehouse color="white" size={24} /> */}
                    </View>

                    {/* <Pin color="red" size={72}>
                      <Warehouse color="red" size={36} />
                    </Pin> */}

                    {/* <CustomMarker image={cloudinaryUrl} type="location" /> */}
                    <InfoPanel style={{ width: 272 }} location={location} />
                    {/* {location && <InfoPanel style={{ width: 272 }} location={location} />} */}
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
