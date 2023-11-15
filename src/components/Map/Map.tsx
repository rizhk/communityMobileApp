import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { MapPresets, presets } from "./map.presets";
import { Text } from "components/Text";

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

//TODO: - Display activities on the map
//TODO: - Display fields on the map

interface MapProps {
  initialRegion: MapRegion;
  style?: any;
  preset?: MapPresets;
  activities?: any;
}

const MapComponent: React.FC<MapProps> = ({
  preset = "default",
  initialRegion,
  activities,
  style,
  ...rest
}: MapProps) => {
  const styles = [presets[preset], style];

  const [markerPosition, setMarkerPosition] = useState<Region | null>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  return (
    <>
      <MapView style={styles} initialRegion={initialRegion} {...rest}>
        {markerPosition && <Marker coordinate={markerPosition} />}
        {activities?.data &&
          activities.data.map((activity, index) => {
            const participantsCount = activity?.attributes?.participants?.data?.length;

            const cloudinaryUrl =
              activity?.attributes?.sport?.data?.attributes?.icon?.data?.attributes?.url;

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
                {/* <CustomMarker
                  activityID={activity.id}
                  participantCount={participantsCount}
                  image={cloudinaryUrl}
                  type="activity"
                /> */}
              </Marker>
            );
          })}
      </MapView>
    </>
  );
};

export default MapComponent;
