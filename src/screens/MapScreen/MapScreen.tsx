import { fetchAPIqs } from "api/request";
import { Button } from "components/Button";
import MapComponent from "components/Map/Map";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { useQuery } from "react-query";
import { fetchActivitiesByRegion } from "api/api";
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

const items = [
  { label: "item1", value: "item1" },
  { label: "item2", value: "item2" },
  { label: "item3", value: "item3" },
  { label: "item4", value: "item4" },
];

const dropItems = [
  { icon: () => <Icon icon={Star} />, label: "drop-item1", value: "drop-item1" },
  { icon: () => <Icon icon={Star} />, label: "drop-item2", value: "drop-item2" },
  { icon: () => <Icon icon={Star} />, label: "drop-item3", value: "drop-item3" },
  { icon: () => <Icon icon={Star} />, label: "drop-item4", value: "drop-item4" },
];

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
        // filters={filters}
        // setFilters={setFilters} // If you want to lift state up
      />
      {/* <ShowRefetchButton /> */}

      {/* <ScrollView style={{ display: "flex", flexDirection: "column", gap: 30, padding: 20 }}>
        <TextInput placeholder="type text" style={{ marginVertical: 10 }} />
        <DropPicker items={dropItems} value={item} setValue={setItem} />
        <Radio value={radio} setValue={setRadio} items={items} style={{ marginTop: 20 }} />
        <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", padding: 10, gap: 20 }}>
          <Radio value={radio} setValue={setRadio} items={items} groupDirection="column" color="secondary" />
          <NumberPicker min={0} max={10} value={n} setValue={setN} hasInfinit padding={2} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", padding: 10, gap: 20 }}>
          <Switch value={switchValue} onChange={() => setSwitchValue(!switchValue)} />
          <Switch value={true} />
          <Switch value={false} color="secondary" />
          <Switch value={true} color="secondary" />
          <Switch value={false} color="tertiary" />
          <Switch value={true} color="tertiary" />
        </View>
        <DateTimePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      </ScrollView> */}
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
