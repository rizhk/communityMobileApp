import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface MapProps {
  initialRegion: MapRegion;
  style: any;
}

const MapComponent: React.FC<MapProps> = (props) => {
  //   const { initialRegion, ...rest } = props;

  return (
    <>
      {/* <MapView initialRegion={initialRegion} style={styles.map} /> */}
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapComponent;
