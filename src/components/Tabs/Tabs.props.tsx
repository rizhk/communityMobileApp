import { StackProps } from "components/containers/Stack";
import { createContext, useContext } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type TabsProps = {
  selected: any;
  handleSelect: (val: any) => void;
  style?: StyleProp<ViewStyle>;
  body?: StackProps;
  group?: StackProps;
  header?: StackProps;
};

export type ContextProps = {
  addValue: (val: any) => void;
  selected: any;
  handleSelect: (val: any) => void;
  body?: StackProps;
  group?: StackProps;
  header?: StackProps;
};

export const TabContext = createContext({} as TabsProps & ContextProps);

export const useTabs = () => useContext(TabContext);
