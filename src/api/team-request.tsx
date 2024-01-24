import { fetchAxiosAPI } from "./api";

import { SportsData } from "types/sport";
import { restQueryParams } from "types/global";

export const populateTeam = [""];

export const defaultTeamQueryParams: restQueryParams = {
  sort: "name:asc",
  populate: populateTeam,
};

export async function fetchTeams(
  params: restQueryParams = defaultTeamQueryParams,
  userToken?: string | null
): Promise<SportsData> {
  return fetchAxiosAPI(`/sports`, params, userToken);
}
