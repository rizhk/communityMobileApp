import { PropsWithChildren, useState } from "react";
import { View, ViewStyle } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import { TabContext, TabsProps } from "./Tabs.props";
import { TabsBody } from "./components/Body";
import { TabsGroup } from "./components/Group";
import { TabsHeader } from "./components/Header";

Tabs.Header = TabsHeader;
Tabs.Group = TabsGroup;
Tabs.Body = TabsBody;

const offset = 20;

export function Tabs(props: PropsWithChildren<TabsProps>) {
  const { children, selected, handleSelect, style, ...rest } = props;
  const [values, setValues] = useState<any[]>([]);

  const addValue = (val: any) => {
    setValues((prev) => {
      if (prev.includes(val)) return prev;
      return [...prev, val];
    });
  };

  function gestureHandler(event: any) {
    if (event.nativeEvent.state !== State.ACTIVE) return;
    const translationX = event.nativeEvent.translationX;
    const index = values.indexOf(selected);
    if (translationX < -offset && index !== values.length - 1) handleSelect(values[index + 1]);
    else if (translationX > +offset && index !== 0) handleSelect(values[index - 1]);
  }

  return (
    <PanGestureHandler onHandlerStateChange={gestureHandler}>
      <View style={[main, style]}>
        <TabContext.Provider value={{ selected, handleSelect, addValue, ...rest }}>{children}</TabContext.Provider>
      </View>
    </PanGestureHandler>
  );
}

const main = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  // gap: spacing.sm,
  height: "100%",
} as ViewStyle;
