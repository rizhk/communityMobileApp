import { fetchAPIqs } from "api/request";
import { Button } from "components/Button";
import MapComponent from "components/Map/Map";
import { useEffect, useState } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useQuery } from "react-query";
import { fetchActivities } from "api/api";
import useSWR from "swr";

import { MainLayout } from "layouts";
import { ActivityIndicator } from "react-native";
import { Region } from "react-native-maps";
import { Text } from "components/Text";
import { shadow, color } from "theme";

export default function MapScreen() {
  //TODO: ADD setUserLocation
  const INITIAL_REGION = {
    latitude: 46.806,
    longitude: 7.153,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  //useState

  //useEffect

  /////FETCH
  const { data, error, isLoading } = useSWR("activities", () => fetchActivities());
  // fetchFields();
  // fetchTournaments();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>error...</Text>;
  }

  return (
    <MainLayout>
      {/* <View style={shadowView}>
        <Text>Test</Text>
      </View>
      <View style={[styles.card, styles.shadowProp]}>
        <View>
          <Text style={styles.heading}>React Native Box Shadow (Shadow Props)</Text>
        </View>
        <Text>Using the elevation style prop to apply box-shadow for iOS devices</Text>
      </View> */}
      <MapComponent activities={data} initialRegion={INITIAL_REGION} />
    </MainLayout>
  );
}

// const styles2 = StyleSheet.create({
//   map: {
//     height: "50%",
//   },
// });

// const shadowView = {
//   height: 100,
//   width: 100,
//   margin: 10,

//   // backgroundColor: "white",
//   ...shadow.sm,
// } as ViewStyle;

// const styles = StyleSheet.create({
//   heading: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 13,
//   },
//   card: {
//     backgroundColor: "white",
//     margin: 8,
//     ...shadow.sm,
//   },
//   shadowProp: {},
// });
