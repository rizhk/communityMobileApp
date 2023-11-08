import { createContext, useContext } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type TabsProps = {
  selected: any;
  handleSelect: (val: any) => void;
  style?: StyleProp<ViewStyle>;
};

export type ContextProps = {
  addValue: (val: any) => void;
};

export const TabContext = createContext({} as TabsProps & ContextProps);

export const useTabs = () => useContext(TabContext);
