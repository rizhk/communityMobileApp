import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { MapPresets, SizePresets, presets, textPresets } from "./map.presets";
import { Text } from "components/Text";

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
  size?: SizePresets;
}

const MapComponent: React.FC<MapProps> = ({
  preset = "default",
  size = "xxl",
  initialRegion,
  style,
  ...rest
}: MapProps) => {
  // const styles = [presets[preset], style];
  const styles = {
    // textStyles: [textPresets[preset], style],
    textStyles: [textPresets[size], style],
    viewStyles: [presets[preset], style],
  };

  return (
    <>
      <Text style={styles.textStyles}>Map Component</Text>
      <MapView style={styles.viewStyles} initialRegion={initialRegion} {...rest} />
    </>
  );
};

export default MapComponent;
