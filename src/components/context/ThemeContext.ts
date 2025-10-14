import { createContext } from 'react';

const ThemeContext = createContext({
  dark: true,
  toggleDark: () => {},
  themeBg: () => {},
  themeText: () => {},
});

export default ThemeContext;
