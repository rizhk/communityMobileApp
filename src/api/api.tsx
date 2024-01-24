// @ts-ignore
import { API_URL } from "@env";
import axios from "axios";

import { restQueryParams } from "types/global";
import { SportsData } from "types/sport";
axios.defaults.baseURL = `${API_URL}/api`;

export async function fetchAxiosAPI(path: string, params?: restQueryParams, userToken?: string | null) {
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
