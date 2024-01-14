import { DimensionValue, ViewProps } from "react-native";
import { RadiusTypes, SpacingTypes, ThemeColorType } from "theme";

export type StackProps = ViewProps & {
  children?: React.ReactNode;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  justify?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  jc?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  align?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  ai?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  alignSelf?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  padding?: SpacingTypes | number;
  pa?: SpacingTypes | number;
  px?: SpacingTypes | number;
  py?: SpacingTypes | number;
  pt?: SpacingTypes | number;
  pb?: SpacingTypes | number;
  pr?: SpacingTypes | number;
  pl?: SpacingTypes | number;
  margin?: SpacingTypes | number;
  ma?: SpacingTypes | number;
  mx?: SpacingTypes | number;
  my?: SpacingTypes | number;
  mt?: SpacingTypes | number;
  mb?: SpacingTypes | number;
  mr?: SpacingTypes | number;
  ml?: SpacingTypes | number;
  backgroundColor?: ThemeColorType;
  bc?: ThemeColorType;
  borderRadius?: RadiusTypes | number;
  borderColor?: ThemeColorType;
  borderWidth?: number;
  br?: RadiusTypes | number;
  brtl?: RadiusTypes | number;
  brtr?: RadiusTypes | number;
  brbl?: RadiusTypes | number;
  brbr?: RadiusTypes | number;
  gap?: SpacingTypes | number;
  full?: boolean;
  flex?: number;
  width?: DimensionValue | undefined;
  w?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  h?: DimensionValue | undefined;
  maxWidth?: DimensionValue | undefined;
  maxHeight?: DimensionValue | undefined;
  top?: DimensionValue | undefined;
  left?: DimensionValue | undefined;
  right?: DimensionValue | undefined;
  bottom?: DimensionValue | undefined;
  t?: DimensionValue | undefined;
  l?: DimensionValue | undefined;
  r?: DimensionValue | undefined;
  b?: DimensionValue | undefined;
  x?: DimensionValue | undefined;
  y?: DimensionValue | undefined;
  z?: number;
  position?: "absolute" | "relative";
  flexGrow?: number | boolean;
  flexShrink?: number | boolean;
  shadow?: boolean;
  wrap?: boolean;
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  onPress?: () => void;
};
