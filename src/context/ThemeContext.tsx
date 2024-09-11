import { useState, useEffect, createContext, ReactNode } from 'react';

interface ContextProps {
  children: ReactNode;
}

interface ThemeContextType {
  theme: string;
  handleToggleThemes: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  handleToggleThemes: () => {},
});

export const ContextProvider = ({ children }: ContextProps) => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggleThemes = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, handleToggleThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};
