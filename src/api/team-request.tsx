import { fetchAxiosAPI } from "./api";

import { restQueryParams } from "types/global";
import { TeamsData } from "types/team";

export const populateTeam = [""];

export const defaultTeamQueryParams: restQueryParams = {
  sort: "name:asc",
  populate: populateTeam,
};

export async function fetchTeams(
  params: restQueryParams = defaultTeamQueryParams,
  userToken?: string | null
): Promise<TeamsData> {
  return fetchAxiosAPI(`/sports`, params, userToken);
}
