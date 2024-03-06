import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchAxiosAPI } from "api/request";
import { Text } from "components/Text/Text";

import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useState } from "react";
import { View } from "react-native";
import useSWR from "swr";
import { InfoFilters, InfoItem, InfoQueryParams } from "types/info";
import { InfoCard } from "./components/InfoCard";
import { ScrollView } from "react-native";
import { YStack } from "components/containers";

type Props = NativeStackScreenProps<MainStackParamList, "info">;

export function InfosScreen({ navigation }: Props) {
  const [filters, setFilters] = useState<InfoFilters>({});

  //TODO: Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //Fetch Activities
  const RestQueryParams: InfoQueryParams = {
    filters: filters,
    populate: "*",
    pagination: {
      page,
      pageSize,
    },
    sort: "title:asc",
  };

  const { data: infos, isLoading: isLoadingActivities } = useSWR(["infos", filters], () =>
    fetchAxiosAPI("/infos", RestQueryParams)
  );

  return (
    <ScrollView>
      <YStack pa="sm" gap="sm">
        {infos?.data.map((info: InfoItem) => {
          return <InfoCard key={info.id} navigation={navigation} info={info} />;
        })}
      </YStack>
    </ScrollView>
  );
}
