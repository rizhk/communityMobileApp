import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { MapPresets, presets } from "./map.presets";

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

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
  console.log(styles, "styles");

  return (
    <>
      <MapView style={styles} initialRegion={initialRegion} {...rest} />
    </>
  );
};

export default MapComponent;
