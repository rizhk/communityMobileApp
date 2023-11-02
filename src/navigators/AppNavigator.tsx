/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { useContext } from "react";
import { ActivityIndicator, useColorScheme } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RegistrationScreen } from "screens/registration/registration-screen";
import { navigationRef, useBackButtonHandler } from "./navigation-utilities";

import { observer } from "mobx-react-lite";
import { AuthStrategy } from "../types";
import { BottomMenu } from "./bottom-menu/bottom-menu";

import { LoginScreen, MessageScreen } from "screens";

import { DeepNavParam } from "navigators/navigator.types";
import { View } from "react-native-animatable";
import { AuthContext } from "context/AuthContext";
import { color } from "theme";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type AuthNavigatorParamList = {
  // Authentication screens
  login: undefined;
  registration: {
    strategy: AuthStrategy;
    user?: {
      email: string;
      firstName: string;
      lastName: string;
      token: string;
      googleId: string;
    };
  };
};

// Documentation: https://reactnavigation.org/docs/stack-navigator
const StackAuth = createNativeStackNavigator<AuthNavigatorParamList>();

const AuthStack = () => {
  return (
    <StackAuth.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="login"
    >
      <StackAuth.Screen name="login" component={LoginScreen} />
      <StackAuth.Screen name="registration" component={RegistrationScreen} />
    </StackAuth.Navigator>
  );
};

const StackMain = createNativeStackNavigator<DeepNavParam>();

const MainNav = () => {
  return (
    <StackMain.Navigator
      screenOptions={() => ({
        headerStyle: navigationStyles.headerStyle,
        headerTintColor: color.headercolor,
        headerTitleAlign: "center",
        headerTitleStyle: navigationStyles.headerTitleStyle,
      })}
      initialRouteName="home"
    >
      <StackMain.Screen options={{ headerShown: false }} name="home" component={BottomMenu} />
      <StackMain.Screen options={{ headerShown: false }} name="message" component={MessageScreen} />
    </StackMain.Navigator>
  );
};

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer((props: NavigationProps) => {
  const colorScheme = useColorScheme();
  useBackButtonHandler(canExit);

  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      {/* {authenticationStore.isAuthenticated ? <MainNav /> : <AuthStack />} */}

      {userToken ? <MainNav /> : <AuthStack />}
      {/* <MainNav /> */}
    </NavigationContainer>
  );
});

AppNavigator.displayName = "AppNavigator";

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["home"];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
