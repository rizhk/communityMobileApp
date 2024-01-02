import { BRCorner, BurgerMenu } from "assets/svg";
import { Button } from "components/Button";
import { Stack, XStack, YStack } from "components/containers";
import { useEffect, useState } from "react";
import { ThemeColorType, buttonSize } from "theme";
import { Dimensions, Pressable, ViewStyle } from "react-native";
import { MenuType } from "./Menu.types";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "components/Icon";
import { color as themeColor } from "theme";

const { width, height } = Dimensions.get("window");
const MARGIN = 10;

const menuItems = [
  { text: "Item 1", type: "action", action: () => console.log("Item 1") },
  { text: "Item 2", type: "action", action: () => console.log("Item 2") },
  { text: "Item 3", type: "action", action: () => console.log("Item 3") },
  { text: "Item 4", type: "action", action: () => console.log("Item 4") },
];

export type MenuProps = MenuType & {
  color?: ThemeColorType;
  iconOptions?: {
    color?: string;
    size?: number;
    iconScale?: number;
  };
};

export function Menu(props: MenuProps) {
  const { color = "primary", iconOptions } = props;
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setOpen(false);
  }, [navigation.getState()]);

  const onPress = () => {
    switch (props.type) {
      case "action":
        props.action();
        break;
      default:
        setOpen((prev) => !prev);
        break;
    }
  };

  return (
    <Stack>
      <Button
        rounded
        color={color}
        iconScale={iconOptions?.iconScale ?? 1.2}
        size="md"
        icon={props.icon || BurgerMenu}
        onPress={onPress}
        style={{
          zIndex: 30,
          margin: MARGIN,
          borderBottomRightRadius: open ? 0 : undefined,
          borderBottomLeftRadius: open ? 0 : undefined,
        }}
      />
      {open && (
        <>
          <Pressable
            onPress={() => {
              setOpen(false);
            }}
            style={background}
          />
          <YStack position="absolute" top={MARGIN} right={10} shadow z={20}>
            <XStack jc="flex-end">
              <Icon icon={BRCorner} color={color} size={buttonSize.md} />
              <Stack w={buttonSize.md} h={buttonSize.md} bc={color} brtr="full" brtl="full" />
            </XStack>
            <YStack bc={color} w={width - 2 * MARGIN} br="md" brtr="none">
              {props.type == "menu" &&
                menuItems.map((item) => (
                  <XStack key={item.text}>
                    <Button
                      text={item.text}
                      onPress={() => {
                        item.action();
                        setOpen(false);
                      }}
                      preset="plainText"
                      color="white"
                    />
                  </XStack>
                ))}
              {props.type === "element" && props.element}
            </YStack>
          </YStack>
        </>
      )}
    </Stack>
  );
}

const background = {
  position: "absolute",
  width: width,
  height: height,
  zIndex: 10,
  right: 0,
} as ViewStyle;
