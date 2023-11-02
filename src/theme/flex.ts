export const FlexStyles = {
  flexRowItems: {
    flexDirection: "row" as const,
  },
  flexRowItemsAround: {
    flexDirection: "row" as const,
    justifyContent: "space-around" as const,
  },
  flexRowItemsBetween: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
  },
  flexRowItemsCenter: {
    flexDirection: "row" as const,
    justifyContent: "center" as const,
  },
  flexStartCenter: {
    alignSelf: "flex-start" as const,
    justifyContent: "center" as const,
  },
  flexStartCenterRow: {
    alignSelf: "flex-start" as const,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    alignContent: "center" as const,
    justifyContent: "center" as const,
  },
  flexColumnBetween: {
    flexDirection: "column" as const,
    justifyContent: "space-between" as const,
  },
  flexColumnCenter: {
    flexDirection: "column" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    alignContent: "center" as const,
  },
};
