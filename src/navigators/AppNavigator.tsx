import { NavigationContainer } from "@react-navigation/native";
import { color } from "theme";

// import { AuthStack } from "./AuthStack/AuthStack";
import { MainStack } from "./MainStack/MainStack";

export function AppNavigator() {
  const AppTheme = {
    dark: false,
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
      <MainStack />
    </NavigationContainer>
  );
}
