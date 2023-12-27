import { API_URL } from "@env";
import axios from "axios";
// @ts-ignore
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

// type Filters = {
//   [key: string]: any; // Allow any property with a string key
// };

//   // Dynamically build the filters
//   Object.keys(filters).forEach((key) => {
//     if (typeof filters[key] === "object" && filters[key] !== null) {
//       // Nested object (e.g., sport: { name: "Spikeball" })
//       apiFilters[key] = {};
//       Object.keys(filters[key]).forEach((innerKey) => {
//         apiFilters[key][innerKey] = { $eq: filters[key][innerKey] };
//       });
//     } else {
//       // Direct value (e.g., date: "2023-07-19")
//       apiFilters[key] = { $eq: filters[key] };
//     }
//   });

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
    `/activities`,
    {
      maxDistance,
      region,
      populate: populateActivity,
      filters: apiFilters,
    },
    userToken
  );
}
