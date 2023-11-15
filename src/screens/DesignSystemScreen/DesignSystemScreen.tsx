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

export default function DesignSystemScreen() {
  return (
    <MainLayout>
      <View style={bg}>
        <View style={shadowView}>
          <Text>Test</Text>
        </View>
        <View style={[styles.card, styles.shadowProp]}>
          <View>
            <Text style={styles.heading}>React Native Box Shadow (Shadow Props)</Text>
          </View>
          <Text>Using the elevation style prop to apply box-shadow for iOS devices</Text>
        </View>
      </View>
    </MainLayout>
  );
}

const bg = {
  backgroundColor: color.white,
  height: "100%",
} as ViewStyle;

const styles2 = StyleSheet.create({
  map: {
    height: "50%",
  },
});

const shadowView = {
  height: 100,
  width: 100,
  margin: 10,

  // backgroundColor: "white",
  ...shadow.sm,
} as ViewStyle;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
  },
  card: {
    backgroundColor: "white",
    margin: 8,
    ...shadow.sm,
  },
  shadowProp: {},
});
