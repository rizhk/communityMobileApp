import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "screens";
import RegistrationScreen from "screens/RegistrationScreen/RegistrationScreen";

export enum AuthStrategy {
  LOCAL = "local",
  GOOGLE = "google",
  APPLE = "apple",
}

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

export function AuthStack() {
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
}
