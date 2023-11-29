import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { MapPresets, presets } from "./map.presets";
import { Text } from "components/Text";
import { ActivitiesData } from "types/activity";
import { CustomMarker } from "./components/Marker";

//TODO: - Display fields on the map

interface MapProps {
  initialRegion: Region;
  // region: Region;
  style?: any;
  preset?: MapPresets;
  activities?: ActivitiesData;
  onRegionChangeComplete?: (newRegion: Region) => void; // Add this line
}

const MapComponent: React.FC<MapProps> = ({
  preset = "default",
  initialRegion,
  // region,
  onRegionChangeComplete,

  activities,
  style,
  ...rest
}: MapProps) => {
  const styles = [presets[preset], style];

  return (
    <>
      <MapView
        style={styles}
        onRegionChangeComplete={onRegionChangeComplete}
        initialRegion={initialRegion}
        // region={region}
        {...rest}
      >
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
};

export default MapComponent;
