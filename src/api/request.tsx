// @ts-ignore
import { API_URL } from "@env";
// const API_URL = "http://127.0.0.1:1337"; //for local request.test.tsx
import axios, { AxiosRequestHeaders } from "axios";

import { Data, ImageUpload, restQueryParams } from "types/global";

axios.defaults.baseURL = `${API_URL}/api`;

export async function fetchAxiosAPI(path: string, params?: restQueryParams, userToken?: string | null): Promise<Data> {
  const headers: any = {};

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }
  try {
    const response = await axios.get(`${path}`, { headers, params });
    return response.data;
  } catch (err) {
    console.error(err, "fetchAxiosAPI fetching error, path:", path);
    throw err;
  }
}

//TODO FormData : optimize this function with the last one (for Strapi, when we add an image to a form, we normally need to use FormData)
export async function postAxiosApiFormData(path: string, data: FormData, userToken?: string | null) {
  const headers = {
    "Content-Type": "multipart/form-data",
  } as AxiosRequestHeaders;
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

// Helper to make Authenficated POST requests to Strapi with axios
export async function postAxiosAPI(path: string, data: any, userToken?: string | null) {
  const headers = {} as AxiosRequestHeaders;

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

export async function deleteAxiosAPI(path: string, userToken?: string | null) {
  const headers: any = {};

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }

  try {
    const response = await axios.delete(path, { headers });
    return response;
  } catch (err) {
    console.error(err, "Axios Delete error, path:", path);
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
