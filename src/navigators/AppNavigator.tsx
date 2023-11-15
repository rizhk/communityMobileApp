import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "context/AuthContext";
import { MainStack } from "./MainStack/MainStack";
import { AuthStack } from "./AuthStack/AuthStack";
import { color } from "theme";

export default function AppNavigator() {
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
  return (
    <NavigationContainer theme={AppTheme}>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
