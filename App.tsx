import * as SplashScreen from "expo-splash-screen";
import React from "react";

import App from "./src/app";

SplashScreen.preventAutoHideAsync();

function PelopsApp() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />;
}

export default PelopsApp;
