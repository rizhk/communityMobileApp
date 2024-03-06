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
import {
  AlertTriangle,
  Camera,
  Church,
  Dumbbell,
  FolderArchive,
  Heart,
  HeartPulse,
  Theater,
  Warehouse,
} from "lucide-react-native";

type Props = NativeStackScreenProps<MainStackParamList, "map">;

export function MapScreen({ navigation }: Props) {
  const [region, setRegion] = useState<Region>(INITIAL_REGION_DAILLENS);
  const [userRegion, isLocationFetched] = useCurrentPosition();
  const [maxDistance, setMaxDistance] = useState(30000); // 30km
  const [openActivity, setOpenActivity] = useState(false);

  //TODO: must fetch incidents and locations

  const mapRef = useRef<MapView>(null);

  const filters = {};

  //Move the map to user Location
  // useEffect(() => {
  //   if (userRegion) {
  //     setRegion(userRegion);
  //   }
  // }, [isLocationFetched]);

  const handleRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
  };

  //FETCHING AND FILTERS
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //Fetch Activities
  const locationQueryParams: LocationQueryParams = {
    filters: filters,
    populate: "*",
    pagination: {
      page,
      pageSize,
    },
    sort: "publishedAt:desc",
  };

  const { data: locations, isLoading: isLoadingLocations } = useSWR(["locations", filters], () =>
    fetchAxiosAPI("/locations", locationQueryParams)
  );

  if (isLoadingLocations) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  // if (!locations) {
  //   return <Text>error...</Text>;
  // }

  return (
    <YStack full>
      {/* <FolderArchive color="red" size={48} />
      <AlertTriangle color="red" size={48} />
      <Church color="red" size={48} />
      <HeartPulse color="red" size={48} />
      <Dumbbell color="red" size={48} />
      <Theater color="red" size={48} />
      <Warehouse color="red" size={48} /> */}
      <MapComponent
        maxDistance={maxDistance}
        mapRef={mapRef}
        locations={locations}
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        navigation={navigation}
      />
    </YStack>
  );
}
