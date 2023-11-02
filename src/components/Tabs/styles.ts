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
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
    gap: 20,
    marginHorizontal: 20,
  },
  tab: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: color.dim,
  },
  selectedTab: {
    borderBottomColor: color.line,
  },
  text: {
    // ...TextStyles.h3,
    textAlign: "center",
    fontSize: 16,
    color: color.dim,
    padding: 15,
  },
  selectedText: {
    color: color.line,
    ...TextStyles.weight.bold,
  },
  body: {
    flexGrow: 1,
    flexShrink: 1,
    overflow: "scroll",
  },
});
