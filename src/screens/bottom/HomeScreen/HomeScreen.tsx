import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useState } from "react";
import { ScrollView } from "react-native";

import { ActualitiesData, ActualityFilters, ActualityItem, ActualityQueryParams } from "types/actuality";
import ActualityCard from "./components/ActualityCard";
import { YStack } from "components/containers";
import Fetcher from "components/Fetcher";

type Props = NativeStackScreenProps<MainStackParamList>;

export function HomeScreen({ navigation }: Props) {
  const [filters, setFilters] = useState<ActualityFilters>({ type: "Pilier public" });

  //TODO: Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //Fetch Activities
  const queryParams: ActualityQueryParams = {
    filters: filters,
    populate: "*",
    sort: "publishedAt:asc",
    pagination: {
      page,
      pageSize,
    },
  };

  // const type = "actualities";

  return (
    <Fetcher<ActualitiesData> url="/actualities" params={queryParams}>
      {(actualities) => (
        <ScrollView>
          <YStack pa="sm" gap="sm">
            {actualities?.data &&
              actualities?.data.map((actuality: ActualityItem) => {
                return <ActualityCard key={actuality.id} navigation={navigation} actuality={actuality} />;
              })}
          </YStack>
        </ScrollView>
      )}
    </Fetcher>
  );
}
