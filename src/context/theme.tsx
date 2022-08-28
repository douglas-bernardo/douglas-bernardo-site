import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { setCookie, parseCookies } from 'nookies';

type ThemeContextData = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextData);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const cookieKey = '@BeanCodes:theme';

  const [theme, setTheme] = useState('');

  useEffect(() => {
    const cookies = parseCookies();
    setTheme(cookies[cookieKey] ? cookies[cookieKey] : 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevState) => {
      const currentTheme = prevState === 'light' ? 'dark' : 'light';

      // localStorage.setItem('@BeanCodes:theme', currentTheme);
      setCookie(null, cookieKey, currentTheme, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      return currentTheme;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within an ThemeProvider');
  }

  return context;
}
