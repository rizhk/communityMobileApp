import { PaletteIcon } from "assets/svg";
import { Button } from "components/Button";
import { Popup } from "components/Modal";
import { Text } from "components/Text";
import { XStack } from "components/containers/Stack";
import { useState } from "react";
import { ThemeColorType } from "theme";
import { shadowStyle } from "theme/styles";

type ColorPickerProps = {
  label?: string;
  textLabel?: string;
  setColor: (color: ThemeColorType) => void;
  setTextColor?: (color: ThemeColorType) => void;
};
const colors: ThemeColorType[] = [
  "primary",
  "secondary",
  "tertiary",
  "white",
  "black",
  "grey600",
  "grey500",
  "grey400",
];

export default function ColorPicker(props: ColorPickerProps) {
  const { setColor, setTextColor, label = "Pick a color", textLabel = "Pick a text color" } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        icon={PaletteIcon}
        size="sm"
        iconScale={2.2}
        color="grey600"
        onPress={() => setOpen(!open)}
        style={{ position: "absolute", right: 0, zIndex: 10 }}
      />
      <Popup visible={open} setVisible={setOpen} color="white">
        <Text preset="header">{label}</Text>
        <XStack gap="xs" jc="center">
          {colors.map((c) => (
            <Button
              rounded
              color={c as ThemeColorType}
              size="sm"
              onPress={() => {
                setColor(c);
                setOpen(false);
              }}
              key={c}
            />
          ))}
        </XStack>
        {setTextColor !== undefined && (
          <>
            <Text preset="header">{textLabel}</Text>
            <XStack gap="xs" jc="center">
              {colors.map((c) => (
                <Button
                  rounded
                  color={c as ThemeColorType}
                  size="sm"
                  onPress={() => {
                    setTextColor(c);
                    setOpen(false);
                  }}
                  style={shadowStyle}
                  key={`t-${c}`}
                />
              ))}
            </XStack>
          </>
        )}
      </Popup>
    </>
  );
}
