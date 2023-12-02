import { StyleSheet } from "react-native";
import { color, palette, FlexStyles, spacing } from "theme";
import { radius } from "theme/shape";

const ChannelIconSize = 45;
const messageButtonSize = 35;

export const MessageScreenStyles = StyleSheet.create({
  outerContainer: {
    paddingBottom: spacing.md,
    // backgroundColor: palette.background,
    height: "100%",
  },

  innerContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },

  //Header
  header: {
    height: 100,
    ...FlexStyles.flexRowItemsCenter,
    paddingBottom: spacing.md,
    padding: spacing.sm,
    paddingTop: 60,
    gap: spacing.sm,
    alignItems: "center",
    paddingRight: spacing.sm,
    // backgroundColor: palette.grey,
  },
  channelDetails: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
    gap: spacing.xs,
  },
  channelDetailsTextContainer: {
    display: "flex",
    flexDirection: "column",
  },
  channelDetailsText: {
    color: color.text,
    fontSize: 21,
    fontWeight: "bold",
  },
  channelDetailsDate: {
    color: palette.white,
    marginTop: spacing.xs,
    alignSelf: "flex-end",
    fontSize: 11,
  },
  channelIcon: {
    width: ChannelIconSize,
    height: ChannelIconSize,
    borderRadius: 45,
  },
  //BODY
  feedContainer: {
    flexGrow: 1,
    flexShrink: 1,
    position: "relative",
  },
  feed: {
    padding: spacing.sm,
    backgroundImage: "url(../../assets/bgChat.png)",
  },

  //FOOTER
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "flex-end",
    gap: spacing.xs,
    padding: spacing.sm,
    paddingBottom: spacing.sm,
    backgroundColor: palette.grey,
  },
  textInput: {
    alignSelf: "stretch",
    backgroundColor: palette.lightGrey,
    borderRadius: radius.md,
    color: color.text,
    padding: 10,
    paddingTop: 10,
    width: "75%",
    maxHeight: 100,
    textAlignVertical: "center",
  },
  button: {
    borderRadius: 50,
    width: messageButtonSize,
    height: messageButtonSize,
    backgroundColor: palette.red,
  },
  icon: {
    width: 35,
  },
  endButton: {
    backgroundColor: palette.lightGrey,
    borderRadius: 50,
    size: 80,
    padding: 5,
    position: "absolute",
    bottom: 15,
    right: 15,
    zIndex: 1000,
  },
});

export const MessageStyles = StyleSheet.create({
  outerContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: spacing.sm,
  },
  date: {
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: "hidden",
    // backgroundColor: palette.lightGrey,
    color: palette.white,
    fontSize: 11,
    marginBottom: spacing.sm,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.sm,
    alignItems: "flex-end",
  },
  content: {
    maxWidth: "70%",
    padding: spacing.sm,
    paddingBottom: spacing.xs,
    borderRadius: radius.md,
  },
  authorContent: {
    // backgroundColor: palette.DarkRed,
  },
  contentText: {
    maxWidth: "100%",
    flexShrink: 1,
    color: "white",
  },
  timeText: {
    fontSize: 10,
    // color: palette.grey,
    alignSelf: "flex-end",
  },
  authorText: {
    fontSize: 12,
    color: palette.white,
    alignSelf: "flex-start",
    fontWeight: "bold",
    paddingBottom: 2,
  },
});
