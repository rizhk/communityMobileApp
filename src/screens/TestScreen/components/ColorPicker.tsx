import { Button } from "components/Button";
import { Text } from "components/Text";
import { XStack, YStack } from "components/containers/Stack/Stack";
import { ThemeColorType } from "theme";

type ColorPickerProps = {
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
  const { setColor, setTextColor } = props;

  return (
    <YStack pa="sm">
      <Text preset="header" text="Pick a color" />
      <XStack gap="xs" jc="center">
        {colors.map((c) => (
          <Button
            rounded
            color={c as ThemeColorType}
            size="sm"
            onPress={() => setColor(c)}
            style={buttonBorder}
            key={c}
          />
        ))}
      </XStack>
      {setTextColor !== undefined && (
        <>
          <Text preset="header" text="Pick a text color" />
          <XStack gap="xs" jc="center">
            {colors.map((c) => (
              <Button
                rounded
                color={c as ThemeColorType}
                size="sm"
                onPress={() => setTextColor(c)}
                style={buttonBorder}
                key={`t-${c}`}
              />
            ))}
          </XStack>
        </>
      )}
    </YStack>
  );
}

const buttonBorder = { borderWidth: 1, borderColor: "white", borderRadius: 10 };
