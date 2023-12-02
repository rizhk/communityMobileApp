import { INFINIT_PARTICIPANTS } from "constants/global";
import { ViewStyle } from "react-native";

export function rangedItems(min: number, max: number, padding = 0, step = 1, hasUnlimited = false) {
  const length = Math.floor((max - min) / step) + 1 + (hasUnlimited ? 1 : 0);
  const arr = Array.from({ length }, (_, i) => {
    const val = (min + i * step).toString();
    const label = val.length > padding ? val : val.padStart(padding, "0");
    return { value: val, label };
  });
  if (hasUnlimited) arr.unshift({ value: INFINIT_PARTICIPANTS.toString(), label: " ∞ " });
  return arr;
}

export function styleDirection(direction: "row" | "column" | undefined) {
  return { flexDirection: direction === "row" ? "row" : "column" } as ViewStyle;
}

export function styleJustifyContent(justify: "left" | "center") {
  const justifyContent = justify === "left" ? "flex-start" : "space-around";
  return { justifyContent } as ViewStyle;
}
