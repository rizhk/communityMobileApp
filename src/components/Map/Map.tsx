import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { MapPresets, presets } from "./map.presets";
import { Text } from "components/Text";
import { ActivitiesData } from "types/activity";
import { CustomMarker } from "./components/Marker";

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
  activities?: ActivitiesData;
}

const MapComponent: React.FC<MapProps> = ({
  preset = "default",
  initialRegion,
  activities,
  style,
  ...rest
}: MapProps) => {
  const styles = [presets[preset], style];

  return (
    <>
      <MapView style={styles} initialRegion={initialRegion} {...rest}>
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
                <CustomMarker
                  activityID={activity.id}
                  participantCount={participantsCount}
                  image={cloudinaryUrl}
                  type="activity"
                />
              </Marker>
            );
          })}
      </MapView>
    </>
  );
};

export default MapComponent;
