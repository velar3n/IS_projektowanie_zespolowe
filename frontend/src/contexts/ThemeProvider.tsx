import themeObject, { Theme } from '@app/ui/theme';
import { ReactNode } from 'react';
import { ThemeProvider as WebThemeProvider } from 'styled-components';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme: Theme = {
    ...themeObject,
  };
  return <WebThemeProvider theme={theme}>{children}</WebThemeProvider>;
};

export default ThemeProvider;
