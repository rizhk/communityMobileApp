import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchAxiosAPI } from "api/request";
import { Text } from "components/Text/Text";

import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import { useState } from "react";
import { View } from "react-native";
import useSWR from "swr";
import { InfoFilters, InfoQueryParams } from "types/info";

type Props = NativeStackScreenProps<MainStackParamList, "info">;

export function InfoScreen({ navigation }: Props) {
  const [filters, setFilters] = useState<InfoFilters>({});

  //TODO: Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //Fetch Activities
  const restQueryParams: InfoQueryParams = {
    filters: filters,
    populate: "*",
    pagination: {
      page,
      pageSize,
    },
    sort: "startDate:desc",
  };

  const { data: infos, isLoading: isLoadingActivities } = useSWR(["infos", filters], () =>
    fetchAxiosAPI("/infos", restQueryParams)
  );
  console.log("infos: ", infos);
  return (
    <View>
      <Text>InfoScreen</Text>
    </View>
  );
}
