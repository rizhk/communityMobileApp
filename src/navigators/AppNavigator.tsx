import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "context/AuthContext";
import { MainStack } from "./MainStack/MainStack";
import { AuthStack } from "./AuthStack/AuthStack";

export default function AppNavigator() {
  const { user } = useAuth();
  return (
    // <NavigationContainer theme={}>
    <NavigationContainer>{user ? <MainStack /> : <AuthStack />}</NavigationContainer>
  );
}
