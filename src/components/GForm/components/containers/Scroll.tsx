import { PropsWithChildren, createContext, useContext, useState } from "react";
import { ScrollViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type ScrollContextType = {
  enable: boolean;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScrollContext = createContext({} as ScrollContextType);

export function Scroll({ children, ...props }: PropsWithChildren<ScrollViewProps>) {
  const [enable, setEnable] = useState(true);
  return (
    <ScrollContext.Provider value={{ enable, setEnable }}>
      <ScrollView
        nestedScrollEnabled={true}
        scrollEnabled={enable}
        showsVerticalScrollIndicator={false}
        {...props}
      >
        {children}
      </ScrollView>
    </ScrollContext.Provider>
  );
}

export const useScrollContext = () => useContext(ScrollContext);
