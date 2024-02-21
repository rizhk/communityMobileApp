import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { color, text } from "theme";

import { BottomNavProps, BottomNavPropsType } from "./BottomNavProps";
import TabButton from "./TabButton.tsx";
import CustomHeader from "components/CustomHeader";

const Bottom = createBottomTabNavigator();

export function BottomStack() {
  return (
    <Bottom.Navigator
      initialRouteName="map"
      screenOptions={(route) => ({
        header: () => <CustomHeader />, //TODO: If enable, filter Menu is not working
        headerTintColor: color.white,
        headerTitleStyle: { fontWeight: "bold", fontSize: text.lg },
        tabBarStyle: {
          backgroundColor: color.primary,
          height: 72,
          borderTopWidth: 0.5,
          borderTopColor: color.primaryDark,
        },
      })}
    >
      {BottomNavProps.map((tab: BottomNavPropsType) => (
        <Bottom.Screen
          key={tab.route}
          name={tab.label}
          component={tab.component}
          options={{
            tabBarButton: (props) => (
              <TabButton {...props} tab={tab} isLast={tab.route === BottomNavProps[BottomNavProps.length - 1].route} />
            ),
          }}
        />
      ))}
    </Bottom.Navigator>
  );
}
