import { StackProps } from "components/containers/Stack/Stack";
import { createContext, useContext } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type TabsProps = {
  headers: string[];
  style?: StyleProp<ViewStyle>;
  bodyProps?: StackProps;
  groupProps?: StackProps;
  headerProps?: StackProps;
};

export type ContextProps = {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  bodyProps?: StackProps;
  headerProps?: StackProps;
};

export const TabContext = createContext({} as ContextProps);

export const useTabs = () => useContext(TabContext);
