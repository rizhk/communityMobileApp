import MapView, { Marker, Region, Circle } from "react-native-maps";
import { MapPresets, presets } from "./map.presets";
import { Text } from "components/Text";
import { ActivitiesData } from "types/activity";
import { CustomMarker } from "./components/Marker";
import { color } from "theme";
import { hexToRGBA } from "utils/helper";
import { KM_PER_DEGREE_LATITUDE } from "constants/global";
import useCurrentPosition from "hooks/useCurrentPosition";

//TODO: - Display fields on the map

interface MapProps {
  maxDistance: number;
  region: Region;
  initialRegion?: Region;
  style?: any;
  preset?: MapPresets;
  activities: ActivitiesData;
  mapRef?: any;
  onRegionChangeComplete?: (newRegion: Region) => void; // Add this line
}

function MapComponent(props: MapProps) {
  const { preset = "default", region, onRegionChangeComplete, mapRef, activities, maxDistance, style, ...rest } = props;
  const styles = [presets[preset], style];

  const calculateRadius = (latitudeDelta: number): number => {
    // Convert latitudeDelta to kilometers (40% of the map's height)
    const deltaInKm = latitudeDelta * 0.4 * KM_PER_DEGREE_LATITUDE;
    return deltaInKm * 1000;
  };

  const radius = calculateRadius(region.latitudeDelta);

  console.log(activities?.data, "activities.data");
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
        <Circle
          center={{ latitude: region.latitude, longitude: region.longitude }}
          radius={radius || maxDistance}
          strokeColor={color.primary}
          fillColor={hexToRGBA(color.primary, 0.2)}
        />

        {activities?.data &&
          activities.data.map((activity, index) => {
            const participantsCount = activity?.attributes?.participants?.data?.length;

            const cloudinaryUrl = activity?.attributes?.sport?.data?.attributes?.icon?.data?.attributes?.url;

            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: activity.attributes.latitude,
                  longitude: activity.attributes.longitude,
                }}
                // onPress={(e) => {
                //   e.stopPropagation(),
                //     navigation.navigate("activity", {
                //       activity,
                //     });
                // }}
              >
                <CustomMarker participantCount={participantsCount} image={cloudinaryUrl} type="activity" />
              </Marker>
            );
          })}
      </MapView>
    </>
  );
}

export default MapComponent;
