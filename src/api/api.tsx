import axios from "axios";
// @ts-ignore
import { API_URL } from "@env";
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

export async function fetchActivities(userToken?: string | null) {
  return fetchAxiosAPI(
    `/activities`,
    {
      populate: [
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
      ],
      //   sort: ["title:asc"],
      //   filters: {
      //     author: {
      //       firstName: {
      //         $eq: "Theo",
      //       },
      //     },
      //   },
    },
    userToken
  );
}
