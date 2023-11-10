import { INFINIT_PARTICIPANTS } from "constants/global";
import { ViewStyle } from "react-native";

export function range(min: number, max: number, step = 1, hasUnlimited = false) {
  const length = Math.floor((max - min) / step) + 1 + (hasUnlimited ? 1 : 0);
  const arr = Array.from({ length }, (_, i) => {
    const n = min + i * step;
    return { value: n.toString(), label: n.toString() };
  });
  if (hasUnlimited) arr.unshift({ value: INFINIT_PARTICIPANTS.toString(), label: " ∞ " });
  return arr;
}

export function styleDirection(direction: "row" | "column" | undefined) {
  return { flexDirection: direction === "row" ? "row" : "column" } as ViewStyle;
}

export function styleJustifyContent(justify: "left" | "center") {
  const justifyContent = justify === "left" ? "flex-start" : "space-around";
  return { justifyContent: justifyContent } as ViewStyle;
}
