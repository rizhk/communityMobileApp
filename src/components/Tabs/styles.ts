import { StyleSheet } from "react-native";
import { color } from "theme";
import { TextStyles } from "theme";

export const styles = StyleSheet.create({
  main: {
    backgroundColor: color.background,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flexShrink: 1,
  },

  body: {
    flexGrow: 1,
    flexShrink: 1,
    overflow: "scroll",
  },
});
