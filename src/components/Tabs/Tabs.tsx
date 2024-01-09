import { PropsWithChildren, useState } from "react";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { TabContext, TabsProps } from "./Tabs.props";
import { Tab } from "./components/Tab";
import { TabsHeader } from "./components/Header";
import { Stack } from "components/containers/Stack/Stack";
import { View } from "react-native";

Tabs.Tab = Tab;

const offset = 20;

export function Tabs(props: PropsWithChildren<TabsProps>) {
  const { children, style, groupProps, headers, ...rest } = props;
  const [active, setActive] = useState(headers[0]);

  function gestureHandler(event: any) {
    if (event.nativeEvent.state !== State.ACTIVE) return;
    const translationX = event.nativeEvent.translationX;
    const index = headers.indexOf(active);
    if (translationX < -offset && index !== headers.length - 1) setActive(headers[index + 1]);
    else if (translationX > +offset && index !== 0) setActive(headers[index - 1]);
  }

  return (
    <PanGestureHandler onHandlerStateChange={gestureHandler}>
      <View style={{ width: "100%", height: "100%" }}>
        <TabContext.Provider value={{ active, setActive, ...rest }}>
          <Stack direction="row" pa="sm" gap="md" {...groupProps}>
            {headers.map((header) => (
              <TabsHeader name={header} key={header} />
            ))}
          </Stack>
          {children}
        </TabContext.Provider>
      </View>
    </PanGestureHandler>
  );
}
