import { DimensionValue, View, ViewProps } from "react-native";
import { RadiusTypes, SpacingTypes, ThemeColorType, color, spacing, radius as RADIUS } from "theme";
import { shadowStyle } from "theme/styles";

export interface StackProps extends ViewProps {
  children?: React.ReactNode;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  justify?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  jc?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  align?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  ai?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  alignSelf?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  padding?: SpacingTypes;
  pa?: SpacingTypes;
  margin?: SpacingTypes;
  ma?: SpacingTypes;
  backgroundColor?: ThemeColorType;
  bc?: ThemeColorType;
  borderRadius?: RadiusTypes;
  borderColor?: ThemeColorType;
  borderWidth?: number;
  br?: RadiusTypes;
  gap?: SpacingTypes;
  full?: boolean;
  flex?: number;
  width?: DimensionValue | undefined;
  w?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  h?: DimensionValue | undefined;
  maxWidth?: DimensionValue | undefined;
  maxHeight?: DimensionValue | undefined;
  x?: DimensionValue | undefined;
  y?: DimensionValue | undefined;
  z?: number;
  position?: "absolute" | "relative";
  flexGrow?: number | boolean;
  flexShrink?: number | boolean;
  shadow?: boolean;
  wrap?: boolean;
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
}

export function Stack(props: StackProps) {
  const {
    children,
    direction,
    justify,
    jc,
    align,
    ai,
    alignSelf,
    padding,
    pa = "none",
    margin,
    ma = "none",
    style,
    backgroundColor,
    bc = "transparent",
    borderRadius,
    borderColor = "transparent",
    borderWidth,
    br = "none",
    gap = "none",
    flex,
    width,
    w,
    height,
    h,
    full = false,
    maxWidth,
    maxHeight,
    x,
    y,
    z,
    position,
    flexGrow,
    flexShrink,
    shadow,
    wrap,
    flexWrap,
    ...rest
  } = props;

  const justifyContent = justify || jc;
  const alignItems = align || ai;
  const paddingValue = padding || pa;
  const marginValue = margin || ma;
  const background = backgroundColor || bc;
  const radius = borderRadius || br;
  const fg = typeof flexGrow === "boolean" ? (flexGrow ? 1 : 0) : flexGrow;
  const fs = typeof flexShrink === "boolean" ? (flexShrink ? 1 : 0) : flexShrink;
  const zIndex = z;
  const styles = {
    flexWrap: wrap ? "wrap" : flexWrap,
    zIndex,
    flexDirection: direction,
    flex,
    flexGrow: fg,
    flexShrink: fs,
    justifyContent,
    alignItems,
    alignSelf,
    padding: spacing[paddingValue],
    margin: spacing[marginValue],
    backgroundColor: color[background],
    borderRadius: RADIUS[radius],
    gap: spacing[gap],
    borderColor: color[borderColor],
    borderWidth,
    maxWidth,
    maxHeight,
    top: y,
    left: x,
    width: full ? "100%" : w ?? width,
    height: full ? "100%" : h ?? height,
    position: position ?? (x !== undefined || y !== undefined ? "absolute" : undefined),
  };

  return (
    <View style={[shadow ? shadowStyle : {}, styles, style]} {...rest}>
      {children}
    </View>
  );
}

export function XStack(props: Omit<StackProps, "direction">) {
  const { children, ...rest } = props;

  return (
    <Stack direction="row" {...rest}>
      {children}
    </Stack>
  );
}

export function YStack(props: Omit<StackProps, "direction">) {
  const { children, ...rest } = props;

  return (
    <Stack direction="column" {...rest}>
      {children}
    </Stack>
  );
}
