import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Region, Circle } from "react-native-maps";
import { MapPresets, presets } from "./map.presets";
import { Text } from "components/Text";
import { ActivitiesData } from "types/activity";
import { CustomMarker } from "./components/Marker";
import { color } from "theme";
import { hexToRGBA } from "utils/helper";

//TODO: - Display fields on the map

interface MapProps {
  initialRegion: Region;
  maxDistance: number;
  region?: Region;
  style?: any;
  preset?: MapPresets;
  activities?: ActivitiesData;
  mapRef?: any;
  onRegionChangeComplete?: (newRegion: Region) => void; // Add this line
}

const MapComponent: React.FC<MapProps> = ({
  preset = "default",
  initialRegion,
  region,
  onRegionChangeComplete,
  mapRef,
  activities,
  maxDistance,
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
        ref={mapRef}
        {...rest}
      >
        <Circle
          center={{ latitude: initialRegion.latitude, longitude: initialRegion.longitude }}
          radius={maxDistance}
          strokeColor={color.primary}
          fillColor={hexToRGBA(color.primary, 0.2)}
          // fillColor="rgba(0,0,255,0.2)"
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
};

export default MapComponent;
