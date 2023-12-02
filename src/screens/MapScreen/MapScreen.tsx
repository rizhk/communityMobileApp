import { fetchAPIqs } from "api/request";
import { Button } from "components/Button";
import MapComponent from "components/Map/Map";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { useQuery } from "react-query";
import { fetchActivitiesByRegion, fetchSports } from "api/api";
import useSWR from "swr";

import { MainLayout } from "layouts";
import { ActivityIndicator } from "react-native";
import { LatLng, Region } from "react-native-maps";

import { shadow, color } from "theme";
import * as Location from "expo-location";
import { INITIAL_REGION } from "constants/global";
import MapView from "react-native-maps";
import useCurrentPosition from "hooks/useCurrentPosition";

import { Star } from "assets/svg";
import { Icon } from "components/Icon";
import { Radio, Switch, NumberPicker, DropPicker, TextInput, DateTimePicker } from "components/Inputs";
import { Text } from "components/Text";

import { ScrollView } from "react-native";
import { View } from "react-native-animatable";
import ActivityFilter from "components/ActivityFilter/ActivityFilter";

export default function MapScreen() {
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [userRegion, isLocationFetched] = useCurrentPosition();
  const mapRef = useRef<MapView>(null);
  const [maxDistance, setMaxDistance] = useState(30000); // 30km

  const [radio, setRadio] = useState("item1");
  const [switchValue, setSwitchValue] = useState(false);
  const [n, setN] = useState(0);
  const [item, setItem] = useState("drop-item1");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  // ... other states ...

  const handleOpenFilter = () => {
    setIsFilterVisible(true);
  };

  const handleCloseFilter = () => {
    setIsFilterVisible(false);
  };

  const handleApplyFilter = () => {
    // Update filters and fetch new data
    handleCloseFilter();
  };

  const filters = {
    sport: {
      name: "Basketball",
    },
    // date: "2023-07-19",
  };

  //Move the map to user Location
  useEffect(() => {
    if (userRegion) {
      setRegion(userRegion);
    }
  }, [isLocationFetched]);

  const handleRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
  };

  const handleRefetch = () => {
    mutate("activities"); // Force a revalidation
  };

  //TODO: Better styling and way to show refetch button
  const ShowRefetchButton = () => {
    return (
      <View style={{ position: "absolute", top: 0, left: 0, zIndex: 100 }}>
        <Button onPress={handleRefetch} text="Refetch" />
      </View>
    );
  };

  //TODO: Add clusters to map

  // console.log(data, "data");
  // if (!isLocationFetched) {
  //   return <ActivityIndicator />;
  // }

  const { data, error, isLoading, mutate } = useSWR(["activities", region, maxDistance, filters], () =>
    fetchActivitiesByRegion(region, maxDistance, filters)
  );

  const { data: dataSports } = useSWR(["sports"], () => fetchSports());

  console.log("dataSports", dataSports);

  if (error) {
    return <Text>error...</Text>;
  }

  return (
    <MainLayout>
      <Button onPress={handleOpenFilter} text="Filter" />
      <ActivityFilter
        isVisible={isFilterVisible}
        onClose={handleCloseFilter}
        onApply={handleApplyFilter}
        sportItems={dataSports.data}
        // filters={filters}
        // setFilters={setFilters} // If you want to lift state up
      />
      {/* <ShowRefetchButton /> */}

      {/* <MapComponent
        maxDistance={maxDistance}
        mapRef={mapRef}
        activities={data}
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
      /> */}
    </MainLayout>
  );
}
