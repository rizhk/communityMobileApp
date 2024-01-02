import { Menu, MenuProps } from "components/Menu/Menu";
import { MenuType } from "components/Menu/Menu.types";
import { useEffect } from "react";
import { ThemeColorType, color } from "theme";

export type HeaderMenuProps = MenuProps & {
  navigation: any;
  // menu: MenuType;
  // color?: ThemeColorType;
  // iconOptions?: {
  //   color?: string;
  //   size?: number;
  //   iconScale?: number;
  // };
};

export function useHeaderMenu(props: HeaderMenuProps) {
  const { navigation, ...rest } = props;
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Menu {...rest} />,
    });
  }, []);
}
