import { StyleSheet } from "react-native";

import { color, palette, spacing } from "../../theme";

export const chatStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "transparent",
  },
  search: {
    margin: spacing.md,
  },
});

export const cardStyles = StyleSheet.create({
  messageHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  messageAvatar: {},
  avatarContainerBaseInactif: {
    borderColor: color.palette.lightGrey,
  },
  notifDateInactif: {
    color: palette.lightGrey,
  },
  messageTitleInactif: {
    color: palette.lightGrey,
  },
  messageTextInactif: {
    color: palette.lightGrey,
  },
  messageUserInactif: {
    color: palette.lightGrey,
  },
  eventDetails: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "flex-end",
  },
  eventDate: {
    alignSelf: "flex-end",
  },
  location: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "flex-end",
  },
  eventText: {
    color: palette.lightGrey,
    fontSize: 12,
  },
  icon: {
    width: 15,
    height: 15,
  },
  border: {
    marginTop: 10,
  },
});

export const createStyles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: color.primary,
    borderRadius: 50,
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 20,
  },
  container: {
    // backgroundColor: "#f001",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column-reverse",
  },
  innerContainer: {
    backgroundColor: color.palette.darkGrey,
    height: "93%",
    width: "100%",
    diaplay: "flex",
    borderTopEndRadius: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  closeButton: {
    position: "absolute",
    right: 0,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: color.palette.white,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  searchBar: { marginHorizontal: 10 },
  list: {
    marginHorizontal: 10,
  },
  listHeader: {
    marginTop: 20,
  },
});
