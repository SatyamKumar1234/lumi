import { createContext } from 'react';
import { lightTheme, themes } from './theme';


export type Theme = typeof lightTheme;
export type ThemeKey = keyof typeof themes;

export interface ThemeContextType {
    theme: Theme;
    themeId: string;
    setThemeId: (id: string) => void;
    isDarkMode: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: lightTheme,
    themeId: 'light',
    setThemeId: () => { },
    isDarkMode: false,
});
