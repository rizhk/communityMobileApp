import { createContext, useContext, useState } from "react";
import { ThemeColorType } from "theme";

type themeTestContextType = {
  color: ThemeColorType;
  setColor: React.Dispatch<React.SetStateAction<ThemeColorType>>;
  textColor: ThemeColorType;
  setTextColor: React.Dispatch<React.SetStateAction<ThemeColorType>>;
};

const ThemeTestContext = createContext<themeTestContextType>({} as themeTestContextType);

export default function ThemeProvider({ children }: any) {
  const [color, setColor] = useState<ThemeColorType>("primary");
  const [textColor, setTextColor] = useState<ThemeColorType>("white");

  return (
    <ThemeTestContext.Provider value={{ color, setColor, textColor, setTextColor }}>
      {children}
    </ThemeTestContext.Provider>
  );
}

export const useThemeTestContext = () => useContext(ThemeTestContext);
