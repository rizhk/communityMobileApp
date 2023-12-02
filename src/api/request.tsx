import { API_URL } from "@env";
import axios, { AxiosRequestHeaders } from "axios";
import { qs } from "qs";
import { ImageUpload } from "types/global";
axios.defaults.baseURL = `${API_URL}/api`;

export type GetDataStrapi = {
  data: object;
  meta: [];
};

export function getApiUrl(path = "") {
  return `${API_URL || "http://localhost:1337"}${path}`;
}

console.log(API_URL, "is API_URL");

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPIqs(path: string, urlParamsObject = {}, options = {}, userToken?: string | null) {
  // Merge default and user options

  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };
  if (userToken) {
    mergedOptions.headers.Authorization = `Bearer ${userToken}`;
  }

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getApiUrl(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText, "fetchAPIqs fetching error, request:", requestUrl);
    throw new Error(`An error occured please try again`);
  }
  const data = await response.json();
  return data;
}

//https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript
//https://bobbyhadz.com/blog/typescript-http-request-axios#making-http-get-requests-with-axios-in-typescript

// Helper to make GET requests to Strapi
export async function fetchAPI(path: string) {
  try {
    const requestUrl = API_URL + `/api${path}`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err, "Axios fetching error, path:", path);
    throw err;
    // return undefined as any as GetDataStrapi;
  }
}

// Helper to make GET requests to Strapi with axios
export async function fetchAxiosAPI(path: string, userToken?: string | null, params?: any) {
  const headers: any = {};

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }
  try {
    const response = await axios.get(`${path}`, { headers, params });
    return response;
  } catch (err) {
    console.error(err, "fetchAxiosAPI fetching error, path:", path);
  }
}

export async function deleteAxiosAPI(path: string, userToken?: string | null) {
  const headers: any = {};

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }

  try {
    const response = await axios.delete(path, { headers });
    return response;
  } catch (err) {
    console.error(err, "Axios fetching error, path:", path);
    throw err;
  }
}

// Helper to make Authenficated POST requests to Strapi with axios
export async function postAxiosAPI(path: string, data: any, userToken?: string | null) {
  const headers: any = {};

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
//TODO FormData : optimize this function with the last one (for Strapi, when we add an image to a form, we normally need to use FormData)
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

export async function putAxiosAPI(path: string, data: any, userToken?: string | null) {
  const headers = {} as AxiosRequestHeaders;

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }
  try {
    const response = await axios.put(path, data, { headers });
    return response;
  } catch (err) {
    console.error(err, "Axios PUT error, path:", path);
    throw err;
  }
}

export async function putAxiosAPIFormData(path: string, data: any, userToken?: string | null) {
  // const headers: any = {};

  const headers: any = {
    "Content-Type": "multipart/form-data",
  };

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }
  try {
    const response = await axios.put(path, data, { headers });
    return response;
  } catch (err) {
    console.error(err, "Axios PUT error");
    throw err;
  }
}

export const uploadImageAndAssign = async (
  id = 1,
  field = "avatar", //cover OU avatar ...
  apiRef = "plugin::users-permissions.user", //api::activity.activity OU api::sport.sport OU plugin::users-permissions.user
  image: ImageUpload //= "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/250px-Image_created_with_a_mobile_phone.png"
) => {
  //Small helper function so we can uploadByUrl or with object
  let imageUri: string;
  if (typeof image === "string") {
    imageUri = image;
  } else if (image && image.uri) {
    imageUri = image.uri;
  } else {
    imageUri = "";
  }

  const formData = new FormData();
  formData.append("ref", apiRef);
  formData.append("refId", id.toString());
  formData.append("field", field);
  image &&
    formData.append(
      "files",
      JSON.parse(
        JSON.stringify({
          uri: imageUri,
          type: "image/jpeg",
          name: field,
        })
      )
    );

  try {
    const response = await postAxiosApiFormData("/upload", formData);
    return response;
  } catch (err) {
    console.error(err);
  }
};
