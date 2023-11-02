import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabArr } from "./bottom-tabs";
import { BottomTab } from "navigators/bottom-menu/bottom-tab-btn";
import { color } from "theme";
import { BottomMenuNavigatorParamList } from "navigators/navigator.types";
import { navigationStyles } from "theme/components/navigation";

const Tab = createBottomTabNavigator<BottomMenuNavigatorParamList>();

export function BottomMenu() {
  // grab the props
  return (
    <Tab.Navigator
      initialRouteName="map"
      screenOptions={() => ({
        tabBarStyle: navigationStyles.tabBarStyle,
        headerStyle: navigationStyles.headerStyle,
        headerTintColor: color.headercolor,
        headerTitleAlign: "center",
        headerTitleStyle: navigationStyles.headerTitleStyle,
      })}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route as keyof BottomMenuNavigatorParamList}
            component={item.component}
            options={(route) => ({
              tabBarShowLabel: false,
              headerShown: true,
              title: item.label,
              tabBarButton: (props) => {
                return <BottomTab {...props} tab={item} />;
              },
            })}
          />
        );
      })}
    </Tab.Navigator>
  );
}
