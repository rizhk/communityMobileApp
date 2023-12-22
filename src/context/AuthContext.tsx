import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAPIqs, postAxiosAPI } from "api/request";
import I18n from "i18n-js";
import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction, useContext } from "react";
import { Alert } from "react-native";
const API_URL = process.env.API_URL;

interface UserLoginInterface {
  favoriteSports?: [];
  firstName: string;
  lastName: string;
  password: string;
  avatar?: ImageUpload;
  username: string;
}

interface AuthContextInterface {
  adding: boolean;
  setAdding: Dispatch<SetStateAction<boolean>>;
  tournamentAdding: boolean;
  setTournamentAdding: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  userToken: string | null;
  user: any;
  setUser: any;
  loginContext: any; //TODO TS ERROR
  registerContext: (values: UserLoginInterface, image?: ImageUpload) => Promise<any>;

  logout: () => void;
  fetchLoggedInUser: () => void;
}

interface UserLoginInterface {
  user: { [key: string]: any };
  jwt: string;
}

export const AuthContext = createContext<AuthContextInterface>({
  adding: false,
  setAdding: () => {},
  tournamentAdding: false,
  setTournamentAdding: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
  isLoading: false,
  setIsLoading: () => {},
  setUser: {},
  loading: false,
  setLoading: () => {},
  userToken: null,
  user: null,
  loginContext: async () => {},
  registerContext: async () => {},
  fetchLoggedInUser: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [adding, setAdding] = useState<boolean>(false);
  const [tournamentAdding, setTournamentAdding] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    fetchLoggedInUser();
  }, [adding]);

  const setUserAndToken = (user: any, jwt: string | null) => {
    setUser({ ...user });
    setUserToken(jwt);
    AsyncStorage.setItem("user", JSON.stringify(user));
  };

  //Login
  const loginContext = async (data: { email: string; password: string }) => {
    setLoading(true);
    const { email, password } = data;

    try {
      const response = await postAxiosAPI("/auth/local", {
        identifier: email,
        password,
      });
      response && AsyncStorage.setItem("userToken", response?.data?.jwt);
      response && fetchLoggedInUser();
    } catch (err) {
      setErrorMessage(err?.response?.data?.error?.message);
      // console.log(err, "Error loginContext");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerContext = async (values: UserLoginInterface, image: ImageUpload, navigation: any) => {
    setLoading(true);
    const valuesWithEmail = {
      email: values?.username,
      username: values?.username,
      favoriteSports: values?.favoriteSports,
      firstName: values?.firstName,
      lastName: values?.lastName,
      password: values?.password,
    };

    try {
      const response = await fetch(`${API_URL}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(valuesWithEmail),
      });
      const data = await response.json();
      // console.log(data, "data registerContext");
      //Both methods works

      if (data?.error?.status === 400) {
        throw new Error(data?.error?.message);
        // setErrorMessage(data?.error?.message);
        // setTimeout(() => {
        //   setErrorMessage(null);
        // }, 5000);
        // return;
      }

      // values.avatar &&  (await updateUserAvatar(response?.data.user.id, values.avatar)); //see form.tsx, setFieldValue([item.value], img.uri);
      // image && (await updateUserAvatar(data?.user?.id, image));

      Alert.alert(`${I18n.t("auth.registerSuccess")}`, `${I18n.t("auth.verifyEmail")}`);

      navigation.navigate("login");
    } catch (err) {
      // console.log(err, "Error registerContext");
      setErrorMessage(err?.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //Logout
  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    setUser(null);
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const fetchLoggedInUser = async () => {
    // setIsLoading(true);
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken) {
      // setIsLoading(false);
      return null;
    }
    try {
      const response = await fetchAPIqs(
        "/users/me",
        {
          populate: [
            "avatar.provider_metadata.public_id",
            "favoriteSports",
            "followers",
            "followings",
            "favoriteSports.icon",
            "blockedUsers",
          ],
        },
        {},
        userToken
      );
      response && setUserAndToken(response, userToken);
    } catch (error) {
      console.error(error, "error in fetchLoggedInUser");
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginContext,
        logout,
        registerContext,
        fetchLoggedInUser,
        adding,
        setAdding,
        tournamentAdding,
        setTournamentAdding,
        errorMessage,
        setErrorMessage,
        user,
        isLoading,
        setIsLoading,
        setUser,
        loading,
        setLoading,
        userToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
