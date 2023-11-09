import { Text as ReactNativeText } from "react-native";
import { presets } from "./text.presets";
import { TextProps } from "./text.props";
import { translate } from "../../i18n";
import { color as themeColor, text as themeText } from "theme";
/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const {
    preset = "default",
    tx,
    txOptions,
    text,
    children,
    color,
    size,
    style: styleOverride,
    ...rest
  } = props;

  // figure out which content to use
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
