import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useRef, useState } from "react";
import { ScrollView } from "react-native";

import { LocationsData, LocationFilters, LocationItem, LocationQueryParams } from "types/location";

import { YStack } from "components/containers";
import Fetcher from "components/Fetcher";
import MapComponent from "components/Map/Map";
import MapView, { Region } from "react-native-maps";
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
import { INITIAL_REGION_DAILLENS } from "constants/global";
import useCurrentPosition from "hooks/useCurrentPosition";

type Props = NativeStackScreenProps<MainStackParamList>;

export function MapScreen({ navigation }: Props) {
  const [filters, setFilters] = useState<LocationFilters>({});
  const [region, setRegion] = useState<Region>(INITIAL_REGION_DAILLENS);
  const [userRegion, isLocationFetched] = useCurrentPosition();
  const [maxDistance, setMaxDistance] = useState(30000); // 30km
  const [openActivity, setOpenActivity] = useState(false);
  //TODO: Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const mapRef = useRef<MapView>(null);
  const handleRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
  };

  //Fetch Activities
  const queryParams: LocationQueryParams = {
    filters: filters,
    populate: "*",
    sort: "publishedAt:desc",
    pagination: {
      page,
      pageSize,
    },
  };

  return (
    <Fetcher<LocationsData> url="/locations">
      {(locations, mutate) => (
        <>
          <YStack pa="sm" gap="sm">
            <MapComponent
              maxDistance={maxDistance}
              mapRef={mapRef}
              locations={locations}
              region={region}
              onRegionChangeComplete={handleRegionChangeComplete}
              navigation={navigation}
            />

            {/* <FolderArchive color="red" size={48} />
            <AlertTriangle color="red" size={48} />
            <Church color="red" size={48} />
            <HeartPulse color="red" size={48} />
            <Dumbbell color="red" size={48} />
            <Theater color="red" size={48} />
            <Warehouse color="red" size={48} /> */}
          </YStack>
        </>
      )}
    </Fetcher>
  );
}
