import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchAxiosAPI } from "api/request";
import { Text } from "components/Text/Text";

import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useState } from "react";
import { View } from "react-native";
import useSWR from "swr";
import { InfoFilters, InfoItem, InfoQueryParams, InfosData } from "types/info";
import { InfoCard } from "./components/InfoCard";
import { ScrollView } from "react-native";
import { YStack } from "components/containers";
import Fetcher from "components/Fetcher";

type Props = NativeStackScreenProps<MainStackParamList, "info">;

export function InfosScreen({ navigation }: Props) {
  const [filters, setFilters] = useState<InfoFilters>({});

  //TODO: Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //Fetch Activities
  const queryParams: InfoQueryParams = {
    filters: filters,
    populate: "*",
    pagination: {
      page,
      pageSize,
    },
    sort: "title:asc",
  };

  return (
    <Fetcher<InfosData> url="/infos">
      {(infos, mutate) => (
        <ScrollView>
          <YStack pa="sm" gap="sm">
            {infos?.data &&
              infos?.data.map((info: InfoItem) => {
                return <InfoCard key={info.id} navigation={navigation} info={info} />;
              })}
          </YStack>
        </ScrollView>
      )}
    </Fetcher>
  );
}
