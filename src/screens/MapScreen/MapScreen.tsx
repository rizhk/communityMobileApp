import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchActivitiesByRegion, fetchSports } from "api/api";
import { Filter } from "assets/svg";
import ActivityFilter from "components/ActivityFilter/ActivityFilter";
import { Button } from "components/Button";
import MapComponent from "components/Map/Map";
import { MenuType } from "components/Menu/Menu.types";
import { Text } from "components/Text";
import { YStack } from "components/containers/Stack/Stack";
import { INITIAL_REGION_FRIBOURG } from "constants/global";
import useCurrentPosition from "hooks/useCurrentPosition";
import { useHeaderMenu } from "hooks/useHeaderMenu";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import MapView, { Region } from "react-native-maps";
import useSWR from "swr";
import CreateActivity from "screens/ActivitiesScreen/components/CreateActivity";

type Props = NativeStackScreenProps<MainStackParamList, "map">;

export function MapScreen({ navigation }: Props) {
  const [region, setRegion] = useState<Region>(INITIAL_REGION_FRIBOURG);
  const [userRegion, isLocationFetched] = useCurrentPosition();
  const [maxDistance, setMaxDistance] = useState(30000); // 30km
  const [openActivity, setOpenActivity] = useState(false);

  const mapRef = useRef<MapView>(null);

  const [isFilterVisible, setIsFilterVisible] = useState(false);

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

  const { data: dataSports, isLoading: isLoadingSport } = useSWR(["sports"], () => fetchSports());

  // if (isLoadingSport) {
  //   return <ActivityIndicator></ActivityIndicator>;
  // }
  if (error) {
    return <Text>error...</Text>;
  }

  const menu: MenuType = {
    type: "element",
    icon: Filter,
    element: <ActivityFilter onApply={handleApplyFilter} currentFilters={filters} />,
  };
  useHeaderMenu({ navigation, ...menu });

  return (
    <YStack full>
      <Button onPress={handleOpenFilter} text="Filter" />
      <CreateActivity open={openActivity} setOpen={setOpenActivity} />
      <Button
        tx="createActivity.button"
        onPress={() => setOpenActivity(true)}
        style={{ alignSelf: "center", bottom: 10, position: "absolute" }}
      />
      {/* <ActivityFilter
        isVisible={isFilterVisible}
        onClose={handleCloseFilter}
        onApply={handleApplyFilter}
        // sportItems={dataSports}
        // filters={filters}
        // setFilters={setFilters} // If you want to lift state up
      /> */}
      {/* <ShowRefetchButton /> */}

      <MapComponent
        maxDistance={maxDistance}
        mapRef={mapRef}
        activities={data}
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
      />
    </YStack>
  );
}
