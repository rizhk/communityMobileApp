import { ActivitiesData, ActivityQueryParams } from "types/activity";

import { fetchAxiosAPI } from "./request";

import { Region } from "react-native-maps";

export const populateActivity = ["cover"];

export const defaultActivityQueryParams: ActivityQueryParams = {
  populate: populateActivity,
};

export async function fetchActivities(
  params: ActivityQueryParams = defaultActivityQueryParams,
  userToken?: string | null
): Promise<ActivitiesData> {
  return fetchAxiosAPI(`/activities`, params, userToken);
}
