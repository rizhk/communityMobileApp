import { translate } from "i18n";
import { Text as ReactNativeText } from "react-native";
import { color as themeColor, text as themeText } from "theme";

import { presets } from "./text.presets";
import { TextProps } from "./text.props";

export function Text(props: TextProps) {
  const { preset = "default", tx, txOptions, text, children, color, size, style: styleOverride, ...rest } = props;

  const i18nText = tx && translate(tx, txOptions);
  const content = i18nText || text || children;

  const style = presets[preset] || presets.default;
  const colorStyle = color ? { color: themeColor[color] } : {};
  const sizeStyle = size ? { fontSize: typeof size == "number" ? size : themeText[size] } : {};
  const styles = [style, colorStyle, sizeStyle, styleOverride];

  return (
    <ReactNativeText {...rest} style={styles}>
      {content}
    </ReactNativeText>
  );
}
