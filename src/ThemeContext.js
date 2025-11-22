import { createContext } from 'react';
import { lightTheme } from './theme';
export const ThemeContext = createContext({
    theme: lightTheme,
    themeId: 'light',
    setThemeId: () => { },
    isDarkMode: false,
});
