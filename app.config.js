import "dotenv/config";

export default {
  expo: {
    name: "community",
    slug: "community",
    owner: "kaherdin",
    version: "0.1",
    entrypoint: "./src/app.tsx",
    orientation: "portrait",
    icon: "./assets/icon-black.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#2B2B2B",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.kaherdin.community",
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          "We require your permission to access your location while using the app. This allows us to suggest nearby activities and utilize your current location for creating new ones.",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#000000",
      },
      package: "com.kaherdin.community",
      versionCode: 6,
      config: {
        googleMaps: {
          apiKey: "AIzaSyDHvSOnWzsHZW9u-txq7-9R9fTZcCYBkmk",
        },
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission: "The app accesses your photos to help you build a personalized profile.",
        },
      ],
      "expo-localization",
    ],
    extra: {
      API_URL: process.env.API_URL,
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
      eas: {
        projectId: "b3ccd5df-7c22-473c-9984-d395ba471854",
      },
    },

    updates: {
      url: "https://u.expo.dev/b3ccd5df-7c22-473c-9984-d395ba471854",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  },
};
