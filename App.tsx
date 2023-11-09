import App from "./src/app";
import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "react-query";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

function PelopsApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App hideSplashScreen={SplashScreen.hideAsync} />
    </QueryClientProvider>
  );
}

export default PelopsApp;
