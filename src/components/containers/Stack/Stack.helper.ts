import { color, spacing, radius as RADIUS } from "theme";
import { shadowStyle } from "theme/styles";
import { StackProps } from "./Stack.props";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export type StackStyleProps = {
  styles: any;
  rest: any;
};

export function getProps(props: StackProps) {
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
    px,
    py,
    pt,
    pb,
    pl,
    pr,
    margin,
    ma = "none",
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
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
    ...getMargin(props),
    ...getPadding(props),
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

  return { styles: [shadow ? shadowStyle : {}, styles, style], rest: rest };
}

const getMargin = (props: StackProps) => {
  const { margin, ma = "none", mx, my, mt, mb, ml, mr } = props;
  const marginValue = margin || ma;
  return {
    marginTop: spacing[mt ?? my ?? marginValue],
    marginBottom: spacing[mb ?? my ?? marginValue],
    marginLeft: spacing[ml ?? mx ?? marginValue],
    marginRight: spacing[mr ?? mx ?? marginValue],
  };
};

const getPadding = (props: StackProps) => {
  const { padding, pa = "none", px, py, pt, pb, pl, pr } = props;
  const paddingValue = padding || pa;
  return {
    paddingTop: spacing[pt ?? py ?? paddingValue],
    paddingBottom: spacing[pb ?? py ?? paddingValue],
    paddingLeft: spacing[pl ?? px ?? paddingValue],
    paddingRight: spacing[pr ?? px ?? paddingValue],
  };
};
