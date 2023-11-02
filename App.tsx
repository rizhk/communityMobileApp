import App from "./src/app";
import React from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

function PelopsApp() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />;
}

export default PelopsApp;
