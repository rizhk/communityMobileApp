import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "context/AuthContext";
import { color } from "theme";

import { AuthStack } from "./AuthStack/AuthStack";
import { MainStack } from "./MainStack/MainStack";

export function AppNavigator() {
  const { user } = useAuth();
  const AppTheme = {
    dark: true,
    colors: {
      primary: color.primary,
      background: color.background,
      card: color.background,
      text: color.text,
      border: color.transparent,
      notification: color.primary,
    },
  };
  return <NavigationContainer theme={AppTheme}>{user ? <MainStack /> : <AuthStack />}</NavigationContainer>;
}
