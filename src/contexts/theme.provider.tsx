// Best practice: ColorsContext.tsx
import React, {createContext, useContext, useMemo, ReactNode} from 'react';
import Colors, {ColorsSchema} from '@styles/common/colors';

interface ThemeContextType {
  colors: ColorsSchema;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: Colors.getTheme(),
});

interface ThemeProviderProps {
  children: ReactNode;
  colorScheme?: 'light' | 'dark';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  colorScheme,
}) => {
  const themeColors = useMemo(() => {
    return {
      colors: Colors.getTheme(colorScheme),
    };
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={themeColors}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeColors = () => useContext(ThemeContext);
