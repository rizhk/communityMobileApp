import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import React, { PropsWithChildren, useContext, useEffect } from "react";
import { createContext } from "react";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { styles } from "./styles";

type TabsProps = {
  selected: any;
  handleSelect: (val: any) => void;
  sx?: ViewStyle;
};

type ContextProps = {
  addValue: (val: any) => void;
};

const TabContext = createContext({} as TabsProps & ContextProps);

type TabsHeaderProps = {
  value: any;
  label: string;
  sx?: ViewStyle;
};

function TabsGroup({ children, sx = {} }: PropsWithChildren<{ sx?: ViewStyle }>) {
  return <View style={{ ...styles.tabContainer, ...sx }}>{children}</View>;
}

function TabsHeader({ value, label, sx = {} }: TabsHeaderProps) {
  const { selected, handleSelect } = useContext(TabContext);
  const { addValue } = useContext(TabContext);

  useEffect(() => {
    addValue(value);
  }, []);

  return (
    <TouchableOpacity
      style={{ ...styles.tab, ...(selected === value ? styles.selectedTab : {}), ...sx }}
      onPress={() => handleSelect(value)}
    >
      <Text style={{ ...styles.text, ...(value === selected ? styles.selectedText : {}) }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function TabsBody({ children, sx = {} }: PropsWithChildren<{ sx?: ViewStyle }>) {
  return <View style={{ ...styles.body, ...sx }}>{children}</View>;
}

Tabs.Header = TabsHeader;
Tabs.Group = TabsGroup;
Tabs.Body = TabsBody;

function Tabs({ children, selected, handleSelect, sx = {} }: PropsWithChildren<TabsProps>) {
  const [values, setValues] = React.useState<any[]>([]);
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
    if (translationX < +20 && index !== values.length - 1) handleSelect(values[index + 1]);
    else if (translationX > -20 && index !== 0) handleSelect(values[index - 1]);
  }

  return (
    <PanGestureHandler onHandlerStateChange={gestureHandler}>
      <View style={{ ...styles.main, ...sx }}>
        <TabContext.Provider value={{ selected, handleSelect, addValue }}>
          {children}
        </TabContext.Provider>
      </View>
    </PanGestureHandler>
  );
}

export default Tabs;
