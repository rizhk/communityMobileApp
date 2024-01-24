import { fetchAxiosAPI } from "./api";

import { SportsData } from "types/sport";
import { restQueryParams } from "types/global";

export const populateSport = ["icon"];

export const defaultSportQueryParams: restQueryParams = {
  sort: "name:asc",
  populate: populateSport,
  pagination: {
    page: 0,
    pageSize: 150,
  },
};

export async function fetchSports(
  params: restQueryParams = defaultSportQueryParams,
  userToken?: string | null
): Promise<SportsData> {
  return fetchAxiosAPI(`/sports`, params, userToken);
}
