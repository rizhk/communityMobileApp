import { MainStackParamList } from "navigators/MainStack/MainNavProps";
import GFormTab from "./components/GFormTab";
import GeneralTab from "./components/GeneralTab";
import { InputsTab } from "./components/InputsTab";
import SteperTab from "./components/SteperTab";
import ViewsTab from "./components/ViewsTab";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Tabs } from "components/Tabs";
import { PaletteIcon } from "assets/svg";
import { MenuType } from "components/Menu/Menu.types";
import { useHeaderMenu } from "hooks/useHeaderMenu";
import ColorPicker from "./components/ColorPicker";
import ThemeProvider, { useThemeTestContext } from "./components/TemeContext";

type TabItem = {
  tab: JSX.Element;
  header: string;
};

const TabsItems: TabItem[] = [
  { tab: <InputsTab />, header: "Inputs" },
  { tab: <GFormTab />, header: "GForm" },
  { tab: <GeneralTab />, header: "General" },
  { tab: <ViewsTab />, header: "Views" },
  { tab: <SteperTab />, header: "Steper" },
];

type Props = NativeStackScreenProps<MainStackParamList, "test">;

export default function TestScreen({ navigation }: Props) {
  return (
    <ThemeProvider>
      <Test navigation={navigation} />
    </ThemeProvider>
  );
}

//the weird refactoring here, is because of the ThemeProvider
function Test({ navigation }: { navigation: any }) {
  const { setColor, setTextColor } = useThemeTestContext();
  const menu: MenuType = {
    icon: PaletteIcon,
    type: "element",
    element: <ColorPicker setColor={setColor} setTextColor={setTextColor} />,
  };

  useHeaderMenu({ navigation, iconOptions: { iconScale: 1.5 }, ...menu });

  return (
    <Tabs headers={TabsItems.map((header) => header.header)}>
      {TabsItems.map((item) => (
        <Tabs.Tab key={item.header} header={item.header}>
          {item.tab}
        </Tabs.Tab>
      ))}
    </Tabs>
  );
}
