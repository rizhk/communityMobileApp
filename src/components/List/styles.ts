import { StyleSheet } from "react-native";
import { color, palette, spacing } from "theme";

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexGrow: 1,
    flexShrink: 1,
    display: "flex",
    flexDirection: "column",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: spacing.sm,
  },
  itemIcon: {
    backgroundColor: color.primary,
    borderRadius: 50,
    marginRight: 10,
    height: 45,
    width: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  itemTextView: {
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: palette.lightGrey,
  },
  itemText: {
    color: color.palette.white,
    fontSize: 18,
    // marginLeft: 10,
    fontWeight: "bold",
    verticalAlign: "middle",
    marginVertical: spacing.sm,
  },
  header: {
    // backgroundColor: palette.lightGrey,
    marginVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: palette.lightGrey,
  },
  headerText: {
    fontSize: 16,
    color: palette.white,
    fontWeight: "bold",
    marginBottom: spacing.sm,
  },
});
