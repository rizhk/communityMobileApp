import * as SplashScreen from "expo-splash-screen";
import React from "react";

import App from "./src/app";

SplashScreen.preventAutoHideAsync();

function CommunityApp() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />;
}

export default CommunityApp;
