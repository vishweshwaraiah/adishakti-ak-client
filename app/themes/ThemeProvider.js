import React, { createContext, useContext, useEffect, useState } from 'react';
import DefaultTheme from '@/themes/DefaultTheme';
import DarkTheme from '@/themes/DarkTheme';
import LightTheme from '@/themes/LightTheme';

const ThemeContext = createContext();

const ThemeProvider = (props) => {
  const { children } = props;

  const [colors, setColors] = useState(DefaultTheme);

  const switchTheme = (themeName) => {
    switch (themeName) {
      case 'dark':
        setColors(DarkTheme);
        break;
      case 'light':
        setColors(LightTheme);
        break;
      default:
        setColors(DefaultTheme);
        break;
    }
  };

  useEffect(() => {
    setColors(DefaultTheme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: colors,
        switchTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
