import { NumberPickerProps } from "components/Inputs/NumberPicker";
import { Text } from "components/Text";
import { XStack } from "components/containers/Stack";
import { INFINIT_PARTICIPANTS } from "constants/global";
import { useRef, useState } from "react";
import { Animated, Pressable, TextInput, ViewStyle } from "react-native";
import { color } from "theme";
import { inputFieldStyle, shadowFocus } from "theme/styles";

import { BaseField } from "./BaseField";
import { GFieldProps, useGForm } from "../GForm.props";

export type GFieldItemType = {
  value: string;
  label: string;
};

const DISABLED_COLOR = "grey800";
const DISABLED_TEXTCOLOR = "grey400";
const PICKER_WIDTH = 120;
const UNSELECTED_WIDTH = 40;
const ANIMATION_DURATION = 300;
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedXStack = Animated.createAnimatedComponent(XStack);

export default function NumberPicker(props: GFieldProps & Omit<NumberPickerProps, "value" | "setValue">) {
  const { containerStyle, valName, tx, text, min, max } = props;
  const { handleChange, values, themeColor = "primary" } = useGForm();
  const [noLimit, setNoLimit] = useState(Number(values[valName]) === INFINIT_PARTICIPANTS);
  const [displayValue, setDisplayValue] = useState(values[valName] as string);
  const [focus, setFocus] = useState(false);
  const ref = useRef<TextInput | null>(null);

  const width = useRef(
    new Animated.Value(
      Number(values[valName]) === INFINIT_PARTICIPANTS ? UNSELECTED_WIDTH : PICKER_WIDTH - UNSELECTED_WIDTH
    )
  ).current;

  const toggleLimit = () => {
    if (noLimit) {
      setNoLimit(false);
      handleChange(valName)(String(displayValue));
      grow();
    } else {
      setNoLimit(true);
      handleChange(valName)(String(INFINIT_PARTICIPANTS));
      shrink();
      if (ref?.current && ref.current.isFocused()) ref.current.blur();
    }
  };

  const shrink = () => {
    Animated.timing(width, {
      toValue: UNSELECTED_WIDTH,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  };

  const grow = () => {
    Animated.timing(width, {
      toValue: PICKER_WIDTH - UNSELECTED_WIDTH,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  };

  return (
    <BaseField style={containerStyle}>
      <XStack ai="center" jc="space-between">
        <BaseField.Label tx={tx} text={text} />
        <AnimatedXStack
          ai="center"
          br="md"
          w={PICKER_WIDTH}
          bc={noLimit ? themeColor : DISABLED_COLOR}
          style={focus ? shadowFocus(themeColor) : undefined}
        >
          <AnimatedTextInput
            value={displayValue}
            inputMode="numeric"
            placeholder="nb"
            onChangeText={(text) => {
              const n = Number(text);
              if (min !== undefined && n < min) setDisplayValue(String(min));
              else if (max !== undefined && n > max) setDisplayValue(String(max));
              else {
                handleChange(valName)(text);
                setDisplayValue(String(n));
                handleChange(valName)(text);
              }
            }}
            onFocus={() => {
              setFocus(true);
              if (noLimit) toggleLimit();
              if (values[valName] === String(INFINIT_PARTICIPANTS)) {
                handleChange(valName)("");
                setDisplayValue("");
                grow();
              }
            }}
            onBlur={() => {
              setFocus(false);
            }}
            style={[inputStyle, { width }, noLimit ? disableInputStyle : {}]}
            ref={ref}
          />
          <Pressable onPress={toggleLimit} style={iButton}>
            <Text
              text=" ∞ "
              size={noLimit ? "lg" : "sm"}
              style={{
                color: noLimit ? color.white : color[DISABLED_TEXTCOLOR],
              }}
            />
          </Pressable>
        </AnimatedXStack>
        <BaseField.ErrorLabel valName={valName} />
      </XStack>
    </BaseField>
  );
}

const inputStyle = {
  ...inputFieldStyle,
  paddingHorizontal: 0,
  textAlign: "center",
} as ViewStyle;

const iButton = {
  flex: 1,
  alignSelf: "stretch",
  justifyContent: "center",
  alignItems: "center",
} as ViewStyle;

const disableInputStyle = {
  backgroundColor: color[DISABLED_COLOR],
  textDecorationLine: "line-through",
  color: color[DISABLED_TEXTCOLOR],
} as ViewStyle;
