import { useNavigation } from "@react-navigation/native";
import { BRCorner, BurgerMenu } from "assets/svg";
import { Button } from "components/Button";
import { Icon } from "components/Icon";
import { Text } from "components/Text";
import { Stack, XStack, YStack } from "components/containers";
import { createContext, useContext, useEffect, useState } from "react";
import { Dimensions, Pressable, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeColorType, buttonSize, spacing } from "theme";

import { MenuItemType, MenuType } from "./Menu.types";

const { width, height } = Dimensions.get("window");
const MARGIN = 10;

export type MenuProps = MenuType & {
  color?: ThemeColorType;
  iconOptions?: {
    color?: string;
    size?: number;
    iconScale?: number;
  };
};

export type menuContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuContext = createContext<menuContextType>({
  open: false,
  setOpen: () => {},
});

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
            <YStack bc={color} w={width - 2 * MARGIN} br="lg" brtr="none" pa="xxs" style={{ overflow: "hidden" }}>
              <MenuContext.Provider value={{ open, setOpen }}>
                {props.type === "menu" &&
                  props.items.map((item: MenuItemType, index) => (
                    <Stack key={item.text} w="100%" jc="center">
                      <TouchableOpacity
                        onPress={() => {
                          item.onPress();
                          setOpen(false);
                        }}
                        style={{ padding: spacing.sm }}
                      >
                        <Text text={item.text} preset="button" style={{ alignSelf: "flex-start" }} />
                      </TouchableOpacity>
                    </Stack>
                  ))}
                {props.type === "element" && props.element}
              </MenuContext.Provider>
            </YStack>
          </YStack>
        </>
      )}
    </Stack>
  );
}

export const useContextMenu = () => useContext(MenuContext);

const background = {
  position: "absolute",
  width,
  height,
  zIndex: 10,
  right: 0,
} as ViewStyle;
