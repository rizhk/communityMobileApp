import { ActivitiesData, ActivityQueryParams } from "types/activity";

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
