import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
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
}

const MapComponent: React.FC<MapProps> = ({
  preset = "default",
  initialRegion,
  style,
  ...rest
}: MapProps) => {
  const styles = [presets[preset], style];

  return (
    <>
      <MapView style={styles} initialRegion={initialRegion} {...rest} />
    </>
  );
};

export default MapComponent;
