import { Tabs } from "components/Tabs";
import { Text } from "components/Text";
import { View, ViewStyle } from "react-native";
import { color, radius } from "theme";

export default function MapScreen() {
  return (
    <View style={page}>
      <Text>MapScreen</Text>
      <Tabs selected="1" handleSelect={(val) => console.log(val)}>
        <Tabs.Group>
          <Tabs.Header text="tab1" value="1" />
          <Tabs.Header text="tab2" value="2" />
          <Tabs.Header text="tab3" value="3" />
        </Tabs.Group>
        <Tabs.Body>
          <Text text="dsadasdas" />
        </Tabs.Body>
      </Tabs>
    </View>
  );
}

const page = {
  backgroundColor: color.background,
  flexGrow: 1,
  borderBottomLeftRadius: radius.xxl,
  borderBottomRightRadius: radius.xxl,
  shadowRadius: 5,
  shadowColor: "#000",
  shadowOpacity: 1,
} as ViewStyle;
