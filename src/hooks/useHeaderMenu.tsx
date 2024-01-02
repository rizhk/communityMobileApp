import { Menu, MenuProps } from "components/Menu/Menu";
import { useEffect } from "react";

export type HeaderMenuProps = MenuProps & {
  navigation: any;
};

export function useHeaderMenu(props: HeaderMenuProps) {
  const { navigation, ...rest } = props;
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Menu {...rest} />,
    });
  }, []);
}
