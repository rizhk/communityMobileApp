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
import useSWR, { mutate } from "swr";

import { fetchActivities, populateActivity } from "api/activity-request";
import { ActivitiesData } from "types/activity";
import { fetchAxiosAPI } from "api/request";
import { LocationQueryParams } from "types/location";

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

  // console.log(data, "data");
  // if (!isLocationFetched) {
  //   return <ActivityIndicator />;
  // }

  //FETCHING AND FILTERS
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //Fetch Activities
  const restQueryParams: LocationQueryParams = {
    filters: filters,
    populate: "*",
    pagination: {
      page,
      pageSize,
    },
    sort: "startDate:desc",
  };

  const { data: locations, isLoading: isLoadingActivities } = useSWR(["locations", filters], () =>
    fetchAxiosAPI("/locations", restQueryParams)
  );

  if (isLoadingActivities) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  if (!locations) {
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
        locations={locations}
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
