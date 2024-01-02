import { color, spacing, radius } from "theme";
import { shadowStyle } from "theme/styles";
import { StackProps } from "./Stack.props";
import { ViewStyle } from "react-native";

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
    brtl,
    brtr,
    brbl,
    brbr,
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
    top,
    left,
    right,
    bottom,
    t,
    l,
    r,
    b,
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
  const background = backgroundColor || bc;
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
    ...getBorderRadius(props),
    backgroundColor: color[background],
    gap: typeof gap === "number" ? gap : spacing[gap],
    borderColor: color[borderColor],
    borderWidth,
    maxWidth,
    maxHeight,
    top: y ?? t ?? top,
    left: x ?? l ?? left,
    right: r ?? right,
    bottom: b ?? bottom,
    width: full ? "100%" : w ?? width,
    height: full ? "100%" : h ?? height,
    position: position ?? (x !== undefined || y !== undefined ? "absolute" : undefined),
  } as ViewStyle;

  return { styles: [shadow ? shadowStyle : {}, styles, style], rest: rest };
}

const getMargin = (props: StackProps) => {
  const { margin, ma = undefined, mx, my, mt, mb, ml, mr } = props;
  const marginValue = margin || ma;
  const mtValue = mt ?? my ?? marginValue;
  const mbValue = mb ?? my ?? marginValue;
  const mlValue = ml ?? mx ?? marginValue;
  const mrValue = mr ?? mx ?? marginValue;
  const marginTop = typeof mtValue === "number" ? mtValue : spacing[mtValue];
  const marginBottom = typeof mbValue === "number" ? mbValue : spacing[mbValue];
  const marginLeft = typeof mlValue === "number" ? mlValue : spacing[mlValue];
  const marginRight = typeof mrValue === "number" ? mrValue : spacing[mrValue];
  return {
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  };
};

const getPadding = (props: StackProps) => {
  const { padding, pa = undefined, px, py, pt, pb, pl, pr } = props;
  const paddingValue = padding || pa;
  const ptValue = pt ?? py ?? paddingValue;
  const pbValue = pb ?? py ?? paddingValue;
  const plValue = pl ?? px ?? paddingValue;
  const prValue = pr ?? px ?? paddingValue;
  const paddingTop = typeof ptValue === "number" ? ptValue : spacing[ptValue];
  const paddingBottom = typeof pbValue === "number" ? pbValue : spacing[pbValue];
  const paddingLeft = typeof plValue === "number" ? plValue : spacing[plValue];
  const paddingRight = typeof prValue === "number" ? prValue : spacing[prValue];
  return {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  };
};

const getBorderRadius = (props: StackProps) => {
  const { borderRadius, br = undefined, brtl, brtr, brbl, brbr, style } = props;
  const borderRadiusValue = borderRadius || br;
  const brtlValue = brtl ?? borderRadiusValue;
  const brtrValue = brtr ?? borderRadiusValue;
  const brblValue = brbl ?? borderRadiusValue;
  const brbrValue = brbr ?? borderRadiusValue;
  const borderTopLeftRadius = typeof brtlValue === "number" ? brtlValue : radius[brtlValue];
  const borderTopRightRadius = typeof brtrValue === "number" ? brtrValue : radius[brtrValue];
  const borderBottomLeftRadius = typeof brblValue === "number" ? brblValue : radius[brblValue];
  const borderBottomRightRadius = typeof brbrValue === "number" ? brbrValue : radius[brbrValue];

  return {
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  };
};
