// @ts-ignore
import { API_URL } from "@env";
import axios from "axios";
import { Region } from "react-native-maps";
import { ActivityFilters, populateActivity } from "types/activity";
import { SportsData } from "types/sport";
axios.defaults.baseURL = `${API_URL}/api`;

export async function fetchAxiosAPI(path: string, params?: any, userToken?: string | null) {
  const headers: any = {};

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }
  try {
    const response = await axios.get(`${path}`, { headers, params });
    return response.data;
  } catch (err) {
    console.error(err, "fetchAxiosAPI fetching error, path:", path);
  }
}

export async function fetchSports(userToken?: string | null): Promise<SportsData> {
  return fetchAxiosAPI(
    `/sports`,
    {
      populate: ["icon"],
      pagination: {
        limit: 1000,
      },
    },
    userToken
  );
}

export async function fetchActivities(userToken?: string | null) {
  return fetchAxiosAPI(
    `/activities`,
    {
      populate: populateActivity,
    },
    userToken
  );
}

export async function fetchActivitiesByRegion(
  region: Region | null,
  maxDistance: number = 5000000,
  filters: ActivityFilters,
  userToken?: string | null
) {
  const apiFilters: { [key: string]: any } = {};

  // if (filters?.sport) {
  //   apiFilters.sport = { name: { $contains: filters?.sport.name } };
  // }
  if (filters?.sport) {
    apiFilters.sport = { name: { $eq: filters?.sport.name } };
  }
  if (filters?.date) {
    apiFilters["date"] = { $eq: filters?.date };
  }

  return fetchAxiosAPI(
    `/activity/find-activities`,
    {
      maxDistance,
      region,
      populate: populateActivity,
      filters: apiFilters,
    },
    userToken
  );
}

export async function fetchActivitiesCustom(filters: ActivityFilters, userToken?: string | null) {
  const apiFilters: { [key: string]: any } = {};

  console.log("ici coquin");

  // if (filters?.sport) {
  //   apiFilters.sport = { name: { $contains: filters?.sport.name } };r
  // }
  if (filters?.sport) {
    apiFilters.sport = { name: { $eq: filters?.sport.name } };
  }
  if (filters?.date) {
    apiFilters["date"] = { $eq: filters?.date };
  }

  return fetchAxiosAPI(
    `/activity/find-activities`,
    {
      populate: populateActivity,
      filters: apiFilters,
      start: 0,
      limit: 1000,
    },
    userToken
  );
}

export async function postAxiosApiFormData(path: string, data: any, userToken?: string | null) {
  const headers: any = {
    "Content-Type": "multipart/form-data",
  };
  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }
  try {
    const response = await axios.post(path, data, { headers });
    return response;
  } catch (err) {
    console.error(err, "Axios Post error, path:", path);
    throw err;
  }
}
