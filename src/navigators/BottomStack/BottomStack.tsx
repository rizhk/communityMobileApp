import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavProps, BottomNavPropsType } from "./BottomNavProps";
import TabButton from "./TabButton.tsx";
import { color, text } from "theme";

const Bottom = createBottomTabNavigator();

export function BottomStack() {
  return (
    <Bottom.Navigator
      initialRouteName="map"
      screenOptions={() => ({
        headerTintColor: color.white,
        headerTitleStyle: { fontWeight: "bold", fontSize: text.xl },
        tabBarStyle: { backgroundColor: color.backgroundLight, height: 80 },
      })}
    >
      {BottomNavProps.map((tab: BottomNavPropsType) => (
        <Bottom.Screen
          key={tab.id}
          name={tab.label}
          component={tab.component}
          options={{
            tabBarButton: (props) => (
              <TabButton
                {...props}
                tab={tab}
                isLast={tab.id === BottomNavProps[BottomNavProps.length - 1].id}
              />
            ),
          }}
        />
      ))}
    </Bottom.Navigator>
  );
}
