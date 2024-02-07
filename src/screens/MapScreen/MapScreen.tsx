import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Filter } from "assets/svg";
import ActivityFilter from "components/ActivityFilter/ActivityFilter";
import { Button } from "components/Button";
import MapComponent from "components/Map/Map";
import { MenuType } from "components/Menu/Menu.types";
import { Text } from "components/Text";
import { YStack } from "components/containers/Stack/Stack";
import { INITIAL_REGION_DAILLENS } from "constants/global";
import useCurrentPosition from "hooks/useCurrentPosition";
import { useHeaderMenu } from "hooks/useHeaderMenu";
import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useEffect, useState, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import MapView, { Region } from "react-native-maps";
import useSWR from "swr";

import { fetchActivities, populateActivity } from "api/activity-request";
import { ActivitiesData } from "types/activity";

type Props = NativeStackScreenProps<MainStackParamList, "map">;

export function MapScreen({ navigation }: Props) {
  const [region, setRegion] = useState<Region>(INITIAL_REGION_DAILLENS);
  const [userRegion, isLocationFetched] = useCurrentPosition();
  const [maxDistance, setMaxDistance] = useState(30000); // 30km
  const [openActivity, setOpenActivity] = useState(false);

  //TODO: must fetch incidents and locations

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
    // sport: {
    //   name: "Basketball",
    // },
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
    mutate();
    // mutate("activities"); // Force a revalidation
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

  const {
    data: activities,
    error,
    isLoading,
    mutate,
  } = useSWR<ActivitiesData>(["activities", filters], () => fetchActivities({ filters, populate: populateActivity }));

  if (isLoading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  if (!activities) {
    return <Text>error...</Text>;
  }

  // const menu: MenuType = {
  //   type: "element",
  //   icon: Filter,
  //   element: <ActivityFilter onApply={handleApplyFilter} currentFilters={filters} />,
  // };
  // useHeaderMenu({ navigation, ...menu });

  return (
    <YStack full>
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
        activities={activities}
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        navigation={navigation}
      />
      <Button
        tx="createActivity.button"
        onPress={() => setOpenActivity(true)}
        style={{ alignSelf: "center", bottom: 10, position: "absolute" }}
      />
    </YStack>
  );
}
