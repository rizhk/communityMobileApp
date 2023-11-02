import { fetchAPIqs, fetchAxiosAPI, postAxiosApiFormData, putAxiosAPI } from "./request";

interface userUpdateInterface {
  userId: number;
  values: object;
  image: ImageUpload;
}

export const updateUserAvatar = async (userId = 1, image: ImageUpload) => {
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
  formData.append("ref", "plugin::users-permissions.user");
  formData.append("refId", userId.toString());
  formData.append("field", "avatar");
  imageUri &&
    formData.append(
      "files",
      JSON.parse(
        JSON.stringify({
          uri: imageUri,
          type: "image/jpeg",
          name: "avatar",
        })
      )
    );

  try {
    const response = await postAxiosApiFormData("/upload", formData);
    return response;
  } catch (err) {
    console.error(err, "Error updateUserAvatar");
  }
};

export const updateUser = async (
  userId: number,
  values: object,
  userToken?: string | null,
  image?: userUpdateInterface["image"]
) => {
  try {
    image && (await updateUserAvatar(userId, image));
    //TODO: Extend this function in strapi backend so we can populate and update user with image and relations
    await putAxiosAPI(`/users/${userId}}`, values, userToken);
    const response = await fetchAxiosAPI("/users/me", userToken);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getOneUser = async (userId: number, userToken?: string | null) => {
  try {
    const response = await fetchAxiosAPI(
      `users-permissions/users/find-one-user/${userId}`,
      userToken
    );
    // console.log("respons :", response?.data);
    return response?.data;
  } catch (err) {
    console.error(err);
  }
};

export const getFollowers = async (
  userId: number,
  userToken: string | null,
  latestUserId: number,
  count: number
) => {
  try {
    const response = await fetchAxiosAPI(
      `users-permissions/users/find-followers/${userId}/${latestUserId}/${count}`,
      userToken
    );
    // console.log("respons follower", response?.data);
    return response?.data;
  } catch (err) {
    console.error(err);
  }
};

export const getFollowings = async (
  userId: number,
  userToken: string | null,
  latestUserId: number,
  count: number
) => {
  try {
    const response = await fetchAxiosAPI(
      `users-permissions/users/find-followings/${userId}/${latestUserId}/${count}`,
      userToken
    );
    // console.log("respons following", response?.data);
    return response?.data;
  } catch (err) {
    console.error(err);
  }
};

export const getUser = async (userId: number, userToken?: string | null) => {
  try {
    const response = await fetchAxiosAPI(`/users/${userId}`, userToken);
    return response;
  } catch (err) {
    console.error(err);
  }
};

// export const searchUsers = async (searchTerm: string userToken?: string | null) => {
//   try {
//     const response = await fetchAxiosAPI(`/users}}`, userToken);
//     return response;
//   } catch (err) {
//     console.error(err);
//   }
// };

export const searchUsers = async (searchTerm: string, limit = 30, userToken?: string | null) => {
  try {
    const response = await fetchAPIqs(
      "/users",
      //TODO: Optimize this search function
      {
        filters: {
          $or: [
            {
              firstName: {
                $contains: searchTerm,
              },
            },
            {
              lastName: {
                $contains: searchTerm,
              },
            },
          ],
        },
        populate: ["avatar", "favoriteSports", "followers", "followings", "favoriteSports.icon"],
        limit: limit,
      },
      {},
      userToken
    );

    return response;
  } catch (err) {
    console.error(err);
  }
};

export const fetchUsersQs = async (limit = 30, userToken?: string | null) => {
  try {
    const response = await fetchAPIqs(
      "/users",
      {
        populate: [
          "avatar.provider_metadata.public_id",
          "favoriteSports",
          "followers",
          "followings",
          "favoriteSports.icon",
        ],
        limit: limit,
      },
      {},
      userToken
    );

    return response;
  } catch (err) {
    console.error(err);
  }
};
