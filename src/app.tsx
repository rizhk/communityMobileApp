import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider } from "context/AuthContext";
import { ChatProvider } from "context/ChatContext";
import AppNavigator from "navigators/AppNavigator";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import { color } from "theme";

interface AppProps {
  hideSplashScreen: () => Promise<boolean>;
}

export default function App({ hideSplashScreen }: AppProps) {
  AsyncStorage.getItem("userToken").then((userToken) => {
    userToken ? setTimeout(hideSplashScreen, 4000) : hideSplashScreen();
  });

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <ChatProvider>
            <AppNavigator
            // initialState={initialNavigationState}
            // onStateChange={onNavigationStateChange}
            />
          </ChatProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
