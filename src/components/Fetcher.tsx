import { defaultQueryParams, fetchAxiosAPI, fetchUseSWR } from "api/request";
import React, { ReactNode } from "react";
import { ActivityIndicator, View } from "react-native";
import useSWR, { KeyedMutator } from "swr";
import { RestQueryParams } from "types/global";
import { Text } from "./Text";
import qs from "qs";

interface FetcherProps<T> {
  url: string;
  params?: RestQueryParams;
  children: (data: T, mutate: KeyedMutator<T>) => ReactNode;
}

function Fetcher<T>({ url, children, params = defaultQueryParams }: FetcherProps<T>): JSX.Element {
  const queryString = qs.stringify(params, { encode: false, arrayFormat: "brackets", allowDots: false });

  const { data, error, mutate } = useSWR<any>(`${url}?${queryString}`, fetchUseSWR, {
    refreshInterval: 60000,
  });

  if (error)
    return (
      <View>
        <Text>Erreur lors du chargement des données...</Text>
      </View>
    );
  if (!data) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children(data, mutate)}</>;
}

export default Fetcher;
