import { Text } from "components/Text";
import { useContext } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { color } from "theme";

import { TabContext, useTabs } from "../Tabs.props";
import { TextProps } from "components/Text/text.props";

type TabsHeaderProps = TextProps & {
  name: string;
  styleContainer?: StyleProp<ViewStyle>;
};

export function TabsHeader(props: TabsHeaderProps) {
  const { name, styleContainer, ...rest } = props;
  const { active, setActive } = useTabs();
  console.log("name", name);
  return (
    <TouchableOpacity style={[tab, name === active ? selectedTab : {}, styleContainer]} onPress={() => setActive(name)}>
      <Text text={name} {...rest} preset={name === active ? "tabHeaderActive" : "tabHeader"} />
    </TouchableOpacity>
  );
}

const tab = {
  flex: 1,
  borderBottomWidth: 2,
  borderBottomColor: color.grey200,
} as ViewStyle;

const selectedTab = {
  borderBottomColor: color.white,
} as ViewStyle;
