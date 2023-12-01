import { PropsWithChildren, createContext, useContext, useState } from "react";
import { ScrollViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type ScrollContextType = {
  enableScroll: boolean;
  setEnableScroll: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScrollContext = createContext({} as ScrollContextType);

export function Scroll({ children, ...props }: PropsWithChildren<ScrollViewProps>) {
  const [enableScroll, setEnableScroll] = useState(true);
  return (
    <ScrollContext.Provider value={{ enableScroll, setEnableScroll }}>
      <ScrollView
        nestedScrollEnabled={true}
        scrollEnabled={enableScroll}
        showsVerticalScrollIndicator={false}
        {...props}
      >
        {children}
      </ScrollView>
    </ScrollContext.Provider>
  );
}

export const useScrollContext = () => useContext(ScrollContext);
