module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo", "@babel/preset-typescript"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@api": "./src/api",
            "@components/*": "./src/components",
            "@constants/*": "./src/constants",
            "@context/*": "./src/context",
            "@i18n/*": "./src/i18n",
            "@navigators/*": "./src/navigators",
            "@screens/*": "./src/screens",
            "@theme/*": "./src/theme",
            "@utils/*": "./src/util",
          },
        },
      ],
    ],
  }
}
