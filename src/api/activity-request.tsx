import { ActivitiesData, ActivityByRegionQueryParams, ActivityFilters, ActivityQueryParams } from "types/activity";
import { fetchAxiosAPI } from "./request";
import { Region } from "react-native-maps";

export const populateActivity = [
  "cover",
  "author",
  "author.avatar",
  "author.blockedUsers",
  "participants",
  "participants.avatar",
  "sport",
  "sport.icon",
  "sport.localizations",
  "channel",
  "blockedUsers",
];

export const defaultActivityQueryParams: ActivityQueryParams = {
  sort: "startDate:desc",
  populate: populateActivity,
};

export async function fetchActivities(
  params: ActivityQueryParams = defaultActivityQueryParams,
  userToken?: string | null
): Promise<ActivitiesData> {
  return fetchAxiosAPI(`/activities`, params, userToken);
}

//WIP : fetchActivitiesByRegion
export async function fetchActivitiesByRegion(
  region: Region | null,
  maxDistance: number = 5000000,
  filters: ActivityFilters,
  userToken?: string | null
): Promise<ActivitiesData> {
  const apiFilters: { [key: string]: any } = {};

  // if (filters?.sport) {
  //   apiFilters.sport = { name: { $contains: filters?.sport.name } };
  // }
  if (filters?.sport) {
    apiFilters.sport = { name: { $eq: filters?.sport.name } };
  }

  const params: ActivityByRegionQueryParams = {
    maxDistance,
    region,
    populate: populateActivity,
    filters: apiFilters,
  };

  return fetchAxiosAPI(`/activity/find-activities`, params, userToken);
}

export async function fetchActivitiesCustom(
  filters: ActivityFilters,
  userToken?: string | null
): Promise<ActivitiesData> {
  const apiFilters: { [key: string]: any } = {};

  console.log("ici coquin");

  // if (filters?.sport) {
  //   apiFilters.sport = { name: { $contains: filters?.sport.name } };r
  // }
  if (filters?.sport) {
    apiFilters.sport = { name: { $eq: filters?.sport.name } };
  }
  // if (filters?.date) {
  //   apiFilters["date"] = { $eq: filters?.date };
  // }

  return fetchAxiosAPI(
    `/activities`,
    {
      populate: populateActivity,
      filters: apiFilters,
      pagination: {
        page: 0,
        pageSize: 10,
      },
    },
    userToken
  );
}
