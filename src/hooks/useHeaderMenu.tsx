import { BurgerMenu } from "assets/svg";
import { Button } from "components/Button";
import { Menu } from "components/Menu/Menu";
import { MenuType } from "components/Menu/Menu.types";
import { useEffect } from "react";

export type HeaderMenuProps = {
  navigation: any;
  menu: MenuType;
  iconOptions?: {
    color?: string;
    size?: number;
    iconScale?: number;
  };
};

export function useHeaderMenu(navigation: any, menu: MenuType) {
  const onPress = () => {
    switch (menu.type) {
      case "action":
        menu.action();
        break;
      case "route":
        navigation.navigate(menu.route, menu.params);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          rounded
          color="grey400"
          iconScale={1.2}
          size="md"
          icon={BurgerMenu}
          onPress={onPress}
          style={{ margin: 10 }}
        />
        // <Menu />
      ),
    });
  }, []);
}
