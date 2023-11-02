import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider } from "context/AuthContext";
import { ChatProvider } from "context/ChatContext";
import { AppNavigator } from "navigators";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import { ErrorBoundary } from "screens/ErrorScreen/ErrorBoundary";

interface AppProps {
  hideSplashScreen: () => Promise<boolean>;
}

export default function App({ hideSplashScreen }: AppProps) {
  AsyncStorage.getItem("userToken").then((userToken) => {
    userToken ? setTimeout(hideSplashScreen, 4000) : hideSplashScreen();
  });

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={"always"}>
        <AuthProvider>
          <ChatProvider>
            <AppNavigator
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </ChatProvider>
        </AuthProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
