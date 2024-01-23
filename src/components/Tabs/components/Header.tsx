import { Text } from "components/Text";
import { TextProps } from "components/Text/text.props";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { color } from "theme";

import { useTabs } from "../Tabs.props";

type TabsHeaderProps = TextProps & {
  name: string;
  styleContainer?: StyleProp<ViewStyle>;
};

export function TabsHeader(props: TabsHeaderProps) {
  const { name, styleContainer, ...rest } = props;
  const { active, setActive } = useTabs();

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
