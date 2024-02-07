import { fetchAxiosAPI } from "./request";

import { Region } from "react-native-maps";
import { ActualitiesData, ActualityQueryParams } from "types/actuality";

export const populateActuality = ["cover"];

export const defaultActualityQueryParams: ActualityQueryParams = {
  sort: "startDate:desc",
  populate: populateActuality,
};

export async function fetchActualities(
  params: ActualityQueryParams = defaultActualityQueryParams,
  userToken?: string | null
): Promise<ActualitiesData> {
  return fetchAxiosAPI(`/actualities`, params, userToken);
}
